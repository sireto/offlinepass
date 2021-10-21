import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/components/datas.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';
import 'package:offlinepass/screens/vault/recovervault.dart';
import 'package:offlinepass/themes.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
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
      body: datas.isEmpty
          ? Center(
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
            )
          : Column(
              children: [
                // Container(
                //   padding: const EdgeInsets.all(8),
                //   color: Colors.grey.shade500,
                //   child: const Text(
                //       "Passwords expire in 10 days. Renew the passwords to make them recoverable with your Master Security Key (MSK). ",
                //       style: TextStyle(
                //         //fontSize: 12,
                //         fontFamily: 'TitilliumWeb',
                //       )),
                // ),
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
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => RenewPassword(
                                              url: datas[index]["url"],
                                              email: datas[index]["email"],
                                              password: datas[index]
                                                  ["password"])));
                                },
                                child: emailUserView(index));
                          }),
                    ),
                  ),
                )
              ],
            ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: kprimarycolor,
        onPressed: () {
          Future data = Navigator.push(context,
              MaterialPageRoute(builder: (context) => const Addhost()));
          data.then((value) {
            if (value != null) {
              setState(() {
                datas = datas;
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
                          color: kprimarycolor),
                      child: Icon(
                        datas[i]["icon"],
                        color: Colors.white,
                        size: 30,
                      )),
                  widthspace(20),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          datas[i]["url"],
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              fontSize: 16,
                              fontFamily: 'TitilliumWeb',
                              fontWeight: FontWeight.bold),
                        ),
                        heightspace(5),
                        Text(
                          datas[i]["email"],
                          style: const TextStyle(
                            fontSize: 14,
                            fontFamily: 'TitilliumWeb',
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: screenWidth * 0.2,
              height: 40,
              child: ElevatedButton(
                onPressed: () {
                  Clipboard.setData(ClipboardData(text: datas[i]["password"]));
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
        ));
  }
}
