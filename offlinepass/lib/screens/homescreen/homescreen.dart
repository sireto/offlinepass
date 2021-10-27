import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/components/datas.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';
import 'package:offlinepass/screens/settings/unlocksettings.dart';
import 'package:offlinepass/screens/vault/recovervault.dart';
import 'package:offlinepass/themes.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<String> url = [
    "https://www.facebook.com",
    "https://www.gmail.com",
    "https://www.yahoo.com",
    "https://www.reddit.com",
    "https://www.twitch.com",
    "https://www.twitter.com",
    "https://www.telegram.com",
    "https://www.linkedin.com"
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Offline Pass",
          style: TextStyle(
            fontFamily: 'TitilliumWeb',
          ),
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
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const Unlocksettings()));
              },
              icon: const Icon(
                Icons.lock,
                color: Colors.white,
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
                                  Future data = Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => RenewPassword(
                                                data: datas[index],
                                                // url: datas[index]["url"],
                                                // email: datas[index]["email"],
                                                // password: datas[index]
                                                // ["password"]
                                              )));
                                  data.then((value) {
                                    setState(() {
                                      datas = datas;
                                    });
                                  });
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
                          color: datas[i]["colors"]),
                      child: url.contains(datas[i]["url"])
                          ? Icon(
                              datas[i]["icon"],
                              color: Colors.white,
                              size: 30,
                            )
                          : Center(
                              child: Text(
                              "${datas[i]["icon"]}",
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                  color: Colors.white),
                            ))),
                  widthspace(20),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          datas[i]["url"]
                              .substring(12, datas[i]["url"]!.length - 4)
                              .toUpperCase(),
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
