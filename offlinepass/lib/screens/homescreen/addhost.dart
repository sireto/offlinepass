import 'dart:convert';
import 'dart:math';

import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/components/datas.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/themes.dart';

class Addhost extends StatefulWidget {
  const Addhost({Key? key}) : super(key: key);

  @override
  _AddhostState createState() => _AddhostState();
}

class _AddhostState extends State<Addhost> {
  //String password = "";
  TextEditingController password = TextEditingController();
  TextEditingController appSiteUrl = TextEditingController();
  TextEditingController usernameEmailPhone = TextEditingController();
  bool visibletext = true;
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
  List icons = const [
    FontAwesomeIcons.facebook,
    FontAwesomeIcons.google,
    FontAwesomeIcons.yahoo,
    FontAwesomeIcons.reddit,
    FontAwesomeIcons.twitch,
    FontAwesomeIcons.twitter,
    FontAwesomeIcons.telegram,
    FontAwesomeIcons.linkedin,
  ];
  List<Color> colors = [
    Colors.red,
    Colors.blue,
    Colors.green,
    Colors.grey,
    Colors.brown,
    Colors.cyan,
    Colors.yellow,
    Colors.purple,
  ];
  var checkindex = 0;
  Color currentcolor = Colors.red;
  final _key = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: IconButton(
            onPressed: () {
              Navigator.pop(context, datas);
            },
            icon: const Icon(
              Icons.arrow_back,
            )),
        title: const Text(
          "Add an App or Website",
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              heightspace(20),
              const Text(
                "Add an App/Site",
                style: TextStyle(
                  fontSize: 14,
                  fontFamily: 'TitilliumWeb',
                ),
                //  style: TextStyle(fontSize: 20),
              ),
              heightspace(20),
              Form(
                  key: _key,
                  child: Column(
                    children: [
                      TypeAheadFormField<String>(
                          // key: _urlkey,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return knullUrl;
                            } else if (!Uri.parse(appSiteUrl.text).isAbsolute) {
                              return kvalidurl;
                            }
                            return null;
                          },
                          suggestionsCallback: (pattern) {
                            return url
                                .where((e) => e
                                    .toLowerCase()
                                    .contains(pattern.toLowerCase()))
                                .toList();
                          },
                          transitionBuilder:
                              (context, suggestionsBox, controller) {
                            return suggestionsBox;
                          },
                          hideSuggestionsOnKeyboardHide: true,
                          textFieldConfiguration: TextFieldConfiguration(
                              controller: appSiteUrl,
                              scrollPadding: const EdgeInsets.only(bottom: 250),
                              onSubmitted: (value) {
                                setState(() {
                                  appSiteUrl.text = value;
                                });
                              },
                              decoration: InputDecoration(
                                labelText: "App/Site URL",
                                labelStyle: const TextStyle(
                                    fontSize: 16, color: Colors.grey),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                suffixIcon: const Icon(
                                  Icons.arrow_drop_down_outlined,
                                  size: 30,
                                  color: Colors.grey,
                                ),
                              )),
                          itemBuilder: (context, suggestion) {
                            //  print(suggestion!.statename);
                            return ListTile(
                              title: Text(suggestion.toString()),
                            );
                          },
                          noItemsFoundBuilder: (context) => Container(
                                height: 50,
                                child: const Center(
                                  child: Text(
                                    "Not listed",
                                    style: TextStyle(fontSize: 15),
                                  ),
                                ),
                              ),
                          onSaved: (value) {
                            setState(() {
                              appSiteUrl.text = value!;
                            });
                          },
                          onSuggestionSelected: (suggestion) {
                            setState(() {
                              appSiteUrl.text = suggestion;
                            });
                          }),
                      //     heightspace(20),
                      // TextFormField(
                      //   validator: (String? value) {
                      //     if (value == null || value.isEmpty) {
                      //       return knullUrl;
                      //     }
                      //     //  else if (!kurlvalidatior.contains(value)) {
                      //     //   return kvalidurl;
                      //     // }
                      //     return null;
                      //   },
                      //   decoration: InputDecoration(
                      //       label: const Text("App/Site URL"),
                      //       border: OutlineInputBorder(
                      //         borderSide: const BorderSide(color: Colors.black),
                      //         borderRadius: BorderRadius.circular(8),
                      //       )),
                      // ),
                      heightspace(20),
                      TextFormField(
                        controller: usernameEmailPhone,
                        validator: (String? value) {
                          if (value == null || value.isEmpty) {
                            return knullEmail;
                          }
                          return null;
                        },
                        decoration: InputDecoration(
                            labelText: "Username/email or phone",
                            labelStyle: const TextStyle(
                                fontSize: 16, color: Colors.grey),
                            border: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.black),
                              borderRadius: BorderRadius.circular(8),
                            )),
                      ),
                      heightspace(20),
                      !url.contains(appSiteUrl.text)
                          ? Container(
                              height: 50,
                              width: screenWidth,
                              child: ListView.builder(
                                  //  shrinkWrap: true,
                                  scrollDirection: Axis.horizontal,
                                  itemCount: colors.length,
                                  itemBuilder: (context, index) {
                                    return InkWell(
                                      onTap: () {
                                        print(colors[index]);
                                        setState(() {
                                          checkindex = index;
                                          currentcolor = colors[index];
                                        });
                                      },
                                      child: Container(
                                        height: 50,
                                        width: 50,
                                        margin:
                                            const EdgeInsets.only(right: 10),
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(8),
                                          // shape: BoxShape.circle,
                                          color: colors[index],
                                        ),
                                        child: Center(
                                            child: appSiteUrl.text != ""
                                                ? appSiteUrl.text.length > 14
                                                    ? Text(
                                                        appSiteUrl.text
                                                            .substring(12, 14)
                                                            .toUpperCase(),
                                                        style: TextStyle(
                                                            color: checkindex ==
                                                                    index
                                                                ? Colors.white
                                                                : Colors.black),
                                                        textAlign:
                                                            TextAlign.center,
                                                      )
                                                    : checkindex == index
                                                        ? const Center(
                                                            child: Icon(
                                                                Icons.check))
                                                        : null
                                                : checkindex == index
                                                    ? const Center(
                                                        child:
                                                            Icon(Icons.check))
                                                    : null),
                                      ),
                                    );
                                  }),
                            )
                          : const SizedBox(),
                      !url.contains(appSiteUrl.text)
                          ? heightspace(20)
                          : const SizedBox(),
                      Container(
                        // padding: const EdgeInsets.only(left: 30, right: 30),
                        width: screenWidth,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: () {
                            if (_key.currentState!.validate()) {
                              setState(() {
                                password.text = generatepassword();
                              });
                              Map data = {
                                "url": appSiteUrl.text,
                                "email": usernameEmailPhone.text,
                                "password": password.text,
                                "icon": url.contains(appSiteUrl.text)
                                    ? icons[url.indexOf(appSiteUrl.text)]
                                    : appSiteUrl.text
                                        .substring(12, 14)
                                        .toUpperCase(),
                                "colors": url.contains(appSiteUrl.text)
                                    ? Colors.blue
                                    : currentcolor,
                              };
                              datas.add(data);
                              print("$datas");
                            }
                          },
                          child: const Text(
                            "Generate Password",
                            style: TextStyle(
                              fontSize: 16,
                              fontFamily: 'TitilliumWeb',
                            ),
                            // style: TextStyle(color: ktextcolor, fontSize: 16),
                          ),
                          style: ElevatedButton.styleFrom(
                              //   primary: Colors.grey,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8))),
                        ),
                      ),
                    ],
                  )),
              heightspace(20),
              const Text(
                "Password",
                style: TextStyle(
                    color: ktextcolor,
                    fontSize: 18,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.bold),
              ),
              heightspace(10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: screenWidth * 0.6,
                    child: TextFormField(
                      obscureText: visibletext,
                      readOnly: true,
                      controller: password,
                      decoration: InputDecoration(
                          label: const Text("password"),
                          suffixIcon: visibletext
                              ? IconButton(
                                  onPressed: () {
                                    setState(() {
                                      visibility();
                                    });
                                  },
                                  icon: const Icon(Icons.visibility))
                              : IconButton(
                                  onPressed: () {
                                    setState(() {
                                      visibility();
                                    });
                                  },
                                  icon: const Icon(Icons.visibility_off)),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          )),
                    ),
                  ),
                  widthspace(5),
                  ElevatedButton(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: password.text));
                      const snackBar =
                          SnackBar(content: Text("Copied to Clipboard"));
                      ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    },
                    child: const Text(
                      "Copy",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontFamily: 'TitilliumWeb',
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 20),
                        primary: Colors.grey.shade500),
                  ),
                ],
              ),
              heightspace(10),
              password.text != ""
                  ? const Text("Expires in 70 days")
                  : const SizedBox(),
            ],
          ),
        ),
      ),
    );
  }

  void visibility() {
    setState(() {
      visibletext = !visibletext;
    });
  }

  String generatepassword() {
    const length = 15;
    // final letterslowercase = "abcdefghijklmnopqrstuvwxyz";
    // final lettersuppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // final numbers = "0123456789";
    // final special = "@#=+!£\$%&/)(*><-.^][^~";
    // String chars = "$lettersuppercase$letterslowercase$numbers$special";
    var randomIntGen = List.generate(length, (index) {
      int intRandom = Random.secure().nextInt(9);

      return intRandom;
    }).join('');
    var encodedMsk = Base58Encode(utf8.encode(randomIntGen));
    // print(mskGen);
    // print(mskGen.length);
    // print(encodedMsk);
    // print(encodedMsk.length);
    return encodedMsk;
  }
}
