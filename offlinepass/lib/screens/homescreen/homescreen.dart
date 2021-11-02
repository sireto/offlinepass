import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';
import 'package:offlinepass/screens/search/search_screen.dart';
import 'package:offlinepass/screens/settings/settings.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/components/string_extension.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<PassModel> datas = [];
  PasswordManager passwordManager = PasswordManager();
  Future? getPsws;
  final DbOperation _dbOperation = PassOperation();

  @override
  void initState() {
    // TODO: implement initState
    getPsws = getPasswords();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // print('bitcoin'.codeUnits.toList().runtimeType);
    //print(passwordManager.validDays());
    return Scaffold(
      appBar: AppBar(
        // backgroundColor: kprimarycolor,
        title: const Text(
          "Offline Pass",
        ),
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: Container(
            margin: const EdgeInsets.all(12),
            decoration: const BoxDecoration(
                color: Colors.white, shape: BoxShape.circle),
            child: const Icon(
              Icons.lock_rounded,
              color: kprimarycolor,
            )),
        actions: [
          IconButton(
              onPressed: () {
                showSearch(
                    context: context,
                    delegate: Search(datas: datas, context: context));
              },
              icon: const Icon(
                Icons.search_rounded,
                // color: Colors.white70,
                //size: 21,
              )),
          IconButton(
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const Unlocksettings()));
              },
              icon: const Icon(
                Icons.settings,

                //  color: Colors.white70,
              )),
          // IconButton(
          //     onPressed: () {},
          //     icon: const Icon(
          //       FontAwesomeIcons.slidersH,
          //       color: Colors.white,
          //       size: 20,
          //     ))
        ],
      ),
      body: FutureBuilder(
        future: getPsws,
        builder: (context, AsyncSnapshot snapshots) {
          if (snapshots.connectionState == ConnectionState.done) {
            if (!snapshots.hasData || datas.isEmpty) {
              return Center(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Container(
                        height: screenHeight * 0.25,
                        child: const Center(
                          child: Image(
                            image: AssetImage("asset/logo.png"),
                          ),
                        ),
                      ),
                      heightspace(20),
                      const Text(
                        "No Apps/Websites  added yet",
                        style: TextStyle(
                            fontSize: 16,
                            // fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.w500),
                      ),
                      heightspace(10),
                      const Text(
                          "Click on (+) button below to add a new App or website",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 16,
                            // fontFamily: 'TitilliumWeb',
                          )),
                    ],
                  ),
                ),
              );
            } else {
              int validDays = passwordManager.validDays();
              print(validDays);
              return Column(
                children: [
                  passwordManager.checkValidity()
                      ? SizedBox()
                      : Container(
                          width: screenWidth,
                          color: Colors.red,
                          padding: EdgeInsets.only(
                              left: 15.0, top: 4.0, bottom: 12.0, right: 4.0),
                          child: Column(
                            children: [
                              Align(
                                  alignment: Alignment.topRight,
                                  child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          passwordManager.checkValidity(
                                              changeValidity: true);
                                        });
                                      },
                                      child: Icon(Icons.close))),
                              heightspace(2.0),
                              Text(
                                !passwordManager.checkValidity() ||
                                        validDays <= 1
                                    ? "Passwords expired. Renew the passwords to make them recoverable with your Master Security Key (MSK)."
                                    : "Passwords expires after  ${validDays.toString()}  minutes. Renew the passwords to make them recoverable with your Master Security Key (MSK). ",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontStyle: FontStyle.italic,
                                  fontSize: 15,
                                  fontWeight: FontWeight.w300,
                                  //  fontFamily: 'TitilliumWeb',
                                ),
                              ),
                            ],
                          ),
                        ),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: ListView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemCount: snapshots.data.length,
                            itemBuilder: (context, index) {
                              return InkWell(
                                  onTap: () {
                                    Future data = Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => RenewPassword(
                                                  passModel:
                                                      snapshots.data[index],
                                                  // url: datas[index]["url"],
                                                  // email: datas[index]["email"],
                                                  // password: datas[index]
                                                  // ["password"]
                                                )));
                                    data.then((value) {
                                      //print(value);
                                      if (value) {
                                        setState(() {
                                          datas.removeAt(index);
                                        });
                                      }
                                    });
                                  },
                                  child: emailUserView(snapshots.data[index]));
                            }),
                      ),
                    ),
                  )
                ],
              );
            }
          } else {
            print("loading");
            return Center(
              child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue)),
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: kprimarycolor,
        onPressed: () {
          Future data = Navigator.push(context,
              MaterialPageRoute(builder: (context) => const Addhost()));
          data.then((value) {
            if (value.id != null) {
              setState(() {
                datas.insert(0, value);
              });
            }
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Container emailUserView(var data) {
    return Container(
        padding: const EdgeInsets.only(top: 5, bottom: 10),
        width: screenWidth,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Row(
                children: [
                  Container(
                      height: 45,
                      width: 45,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: icons[data.url]!['color']),
                      child: Icon(
                        icons[data.url]!['icon'],
                        color: Colors.white,
                        size: 26,
                      )),
                  widthspace(20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          data.url!
                              .substring(12, data.url!.length - 4)
                              .toString()
                              .capitalize(),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 16,
                            // fontFamily: 'TitilliumWeb',
                            // fontWeight: FontWeight.bold
                          ),
                        ),
                        //  heightspace(5),
                        Text(
                          data.user!,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              fontSize: 15,
                              color: Colors.grey,
                              //  fontFamily: 'TitilliumWeb',
                              fontWeight: FontWeight.w400),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // IconButton(
            //     onPressed: () {
            //       Clipboard.setData(ClipboardData(text: 'datas[i].pass'));
            //       const snackBar = SnackBar(
            //         content: Text("Copied to Clipboard"),
            //         duration: Duration(milliseconds: 20),
            //       );
            //       ScaffoldMessenger.of(context).showSnackBar(snackBar);
            //     },
            //     icon: Icon(Icons.copy)),
            IconButton(
                // padding: EdgeInsets.only(bottom: 8.0, left: 0.0),
                onPressed: () {
                  Clipboard.setData(ClipboardData(
                      text: passwordManager.generatePassword(passModel: data)));
                  final snackBar = SnackBar(
                    content: Text("Copied to Clipboard"),
                    backgroundColor: Colors.grey.shade600,
                  );
                  ScaffoldMessenger.of(context).showSnackBar(snackBar);
                },
                icon: const Icon(
                  Icons.copy_rounded,
                  color: Colors.grey,
                  size: 30,
                )),
          ],
        ));
  }

  Future? getPasswords() async {
    datas = await _dbOperation.getAll();
    datas = datas.reversed.toList();
    print("get passwords");
    print(datas);
    // if (datas.isNotEmpty) {
    //   return "not empty";
    // }
    return datas;
  }
}
