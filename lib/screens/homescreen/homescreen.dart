import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';
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
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Offline Pass",
        ),
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: Container(
            margin: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
                color: Colors.white, shape: BoxShape.circle),
            child: const Icon(Icons.lock_rounded)),
        actions: [
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.search,
                color: Colors.white,
                size: 24,
              )),
          IconButton(
              onPressed: () {},
              icon: const Icon(
                FontAwesomeIcons.slidersH,
                color: Colors.white,
                size: 20,
              ))
        ],
      ),
      body: FutureBuilder(
        future: getPsws,
        builder: (context, snapshots) {
          if (snapshots.connectionState == ConnectionState.done) {
            print(snapshots.data);

            if (!snapshots.hasData) {
              return Center(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Container(
                        height: screenHeight * 0.4,
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
                            fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.bold),
                      ),
                      heightspace(10),
                      const Text(
                          "Click on (+) button below to add a new App or website",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 16,
                            fontFamily: 'TitilliumWeb',
                          )),
                    ],
                  ),
                ),
              );
            } else {
              return Column(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: ListView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemCount: datas.length,
                            itemBuilder: (context, index) {
                              return InkWell(
                                  onTap: () {
                                    Future data = Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => RenewPassword(
                                                  passModel: datas[index],
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
                                  child: emailUserView(index));
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
            if (value.url != null) {
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

  Container emailUserView(int i) {
    return Container(
        padding: const EdgeInsets.only(top: 10, bottom: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: screenWidth * 0.6,
              child: Row(
                children: [
                  Container(
                      height: 50,
                      width: 50,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: icons[datas[i].url]!['color']),
                      child: Icon(
                        icons[datas[i].url]!['icon'],
                        color: Colors.white,
                        size: 30,
                      )),
                  widthspace(20),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          datas[i]
                              .url!
                              .substring(12, datas[i].url!.length - 4)
                              .capitalize(),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              fontSize: 18,
                              fontFamily: 'TitilliumWeb',
                              fontWeight: FontWeight.bold),
                        ),
                        //  heightspace(5),
                        Text(
                          datas[i].user!,
                          style: const TextStyle(
                              fontSize: 15,
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
            Row(
              children: [
                Container(
                  width: screenWidth * 0.2,
                  height: 40,
                  child: ElevatedButton(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: 'datas[i].pass'));
                      const snackBar = SnackBar(
                        content: Text("Copied to Clipboard"),
                        duration: Duration(milliseconds: 20),
                      );
                      ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    },
                    child: const Text(
                      "Copy Password",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontFamily: 'TitilliumWeb',
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8)),
                        // padding:
                        //     const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                        primary: Colors.grey.shade500),
                  ),
                ),
              ],
            ),
          ],
        ));
  }

  Future? getPasswords() async {
    datas = await _dbOperation.getAll();
    datas = datas.reversed.toList();
    if (datas.isNotEmpty) {
      return "not empty";
    }
  }
}
