import 'dart:convert';
import 'dart:math';

import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:offlinepass/themes.dart';

class Addhost extends StatefulWidget {
  const Addhost({Key? key}) : super(key: key);

  @override
  _AddhostState createState() => _AddhostState();
}

class _AddhostState extends State<Addhost> {
  final DbOperation _dbOperation = PassOperation();
  //String pass = "";

  PassModel passModel = PassModel();
  PasswordManager passwordManager = PasswordManager();
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
        backgroundColor: kprimarycolor,
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: IconButton(
            onPressed: () {
              Navigator.pop(context, passModel);
            },
            icon: const Icon(
              Icons.arrow_back,
            )),
        title: const Text(
          "Add an App or Website",
        ),
      ),

      body: WillPopScope(
        onWillPop: () async {
          Navigator.pop(context, passModel);
          return true;
        },
        child: SingleChildScrollView(
          child: Column(
            children: [
              password.text != ""
                  ? Container(
                      width: screenWidth,
                      color: Colors.green.shade400,
                      padding:
                          EdgeInsets.only(left: 15.0, top: 12.0, bottom: 12.0),
                      child: Text(
                        "Expires in 2 days.",
                        style: TextStyle(
                          color: Colors.white,
                          fontStyle: FontStyle.italic,
                          fontSize: 15,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                    )
                  : SizedBox(),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Add an App/Site",

                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w300,
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
                                    cursorColor: kprimarycolor,
                                    style: const TextStyle(
                                      fontSize: 16,
                                      color: Colors.black87,
                                      // fontFamily: 'TitilliumWeb'
                                    ),
                                    scrollPadding:
                                        const EdgeInsets.only(bottom: 250),
                                    decoration: InputDecoration(
                                      labelText: "App/Site URL",
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: const BorderSide(
                                            color: kprimarycolor),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      labelStyle: const TextStyle(
                                          fontSize: 16,
                                          color: Colors.grey,
                                          fontFamily: 'TitilliumWeb'),
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
                              cursorColor: kprimarycolor,
                              style: const TextStyle(
                                fontSize: 16,
                                color: Colors.black87,
                                // fontFamily: 'TitilliumWeb'
                              ),
                              controller: usernameEmailPhone,
                              validator: (String? value) {
                                if (value == null || value.isEmpty) {

                                  return knullUrl;
                                } else if (!kusernamevalidator
                                    .hasMatch(value)) {
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
                                  cursorColor: kprimarycolor,
                                  onSubmitted: (value) {
                                    setState(() {
                                      appSiteUrl.text = value;
                                    });
                                  },
                                  style: const TextStyle(
                                    fontSize: 16,
                                    color: Colors.black87,
                                    // fontFamily: 'TitilliumWeb'

                                  ),
                                  labelText: "Username/email or phone",
                                  labelStyle: const TextStyle(
                                      fontSize: 16,
                                      color: Colors.grey,
                                      fontFamily: 'TitilliumWeb'),
                                  border: OutlineInputBorder(
                                    borderSide:
                                        const BorderSide(color: Colors.black),
                                    borderRadius: BorderRadius.circular(8),
                                  )),
                            ),

                            controller: usernameEmailPhone,
                            validator: (String? value) {
                              if (value == null || value.isEmpty) {
                                return knullEmail;
                              }
                              return null;
                            },
                            decoration: InputDecoration(
                                focusedBorder: OutlineInputBorder(
                                  borderSide:
                                      const BorderSide(color: kprimarycolor),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                labelText: "Username/email or phone",
                                labelStyle: const TextStyle(
                                    fontSize: 16,
                                    color: Colors.grey,
                                    fontFamily: 'TitilliumWeb'),
                                border: OutlineInputBorder(
                                  borderSide:
                                      const BorderSide(color: Colors.black),
                                  borderRadius: BorderRadius.circular(8),
                                )),
                          ),
                          heightspace(20),
                          !url.contains(appSiteUrl.text) &&
                                  appSiteUrl.text != ""
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
                                            margin: const EdgeInsets.only(
                                                right: 10),
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                              // shape: BoxShape.circle,
                                              color: colors[index],
                                            ),
                                            child: Center(
                                                child: appSiteUrl.text != ""
                                                    ? appSiteUrl.text.length >
                                                            14
                                                        ? checkindex == index
                                                            ? Text(
                                                                appSiteUrl.text
                                                                    .substring(
                                                                        12, 14)
                                                                    .toUpperCase(),
                                                                style: const TextStyle(
                                                                    color: Colors
                                                                        .white),
                                                                textAlign:
                                                                    TextAlign
                                                                        .center,
                                                              )
                                                            : null
                                                        : checkindex == index
                                                            ? const Center(
                                                                child: Icon(
                                                                    Icons
                                                                        .check))
                                                            : null
                                                    : checkindex == index
                                                        ? const Center(
                                                            child: Icon(
                                                                Icons.check))
                                                        : null),
                                          ),
                                        );
                                      }),
                                )
                              : const SizedBox(),
                          !url.contains(appSiteUrl.text) &&
                                  appSiteUrl.text != ""
                              ? heightspace(20)
                              : const SizedBox(),
                          Container(
                            // padding: const EdgeInsets.only(left: 30, right: 30),
                            width: screenWidth,
                            height: 50,
                            child: ElevatedButton(
                              onPressed: () async {
                                if (_key.currentState!.validate()) {
                                  passModel = PassModel(
                                    url: appSiteUrl.text,
                                    user: usernameEmailPhone.text,
                                    color: currentcolor,
                                  );
                                  bool result =
                                      await _dbOperation.contain(passModel);
                                  if (result) {
                                    final snackBar = SnackBar(
                                      content: Text(
                                          "Host and username already exist"),
                                      backgroundColor: Colors.grey.shade500,
                                    );
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(snackBar);


                                      passModel = PassModel();
                                    } else {
                                      bool result =
                                          await _dbOperation.isEmpty();

                                      if (result) {
                                        print("database empty");
                                        passwordManager.setNowDate();
                                      }
                                      passModel.id =
                                          await _dbOperation.add(passModel);
                                      final snackBar = SnackBar(
                                        content: Text(
                                            "Password generated successfully"),
                                        backgroundColor: Colors.grey.shade500,
                                      );
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(snackBar);
                                      setState(() {
                                        password.text =
                                            passwordManager.generatePassword(
                                                generate: true,
                                                passModel: passModel);
                                      });
                                    }

                                    passModel.id =
                                        await _dbOperation.add(passModel);
                                    final snackBar = SnackBar(
                                      content: Text(
                                          "Password generated successfully"),
                                      duration: Duration(milliseconds: 500),
                                      backgroundColor: Colors.grey.shade500,
                                    );
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(snackBar);
                                    setState(() {
                                      password.text =
                                          passwordManager.generatePassword(
                                              generate: true,
                                              passModel: passModel);
                                    });

                                  }
                                },
                                child: const Text(
                                  "Generate Password",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 15,
                                    fontWeight: FontWeight.w400,
                                  ),
                                  // style: TextStyle(color: ktextcolor, fontSize: 16),
                                ),
                                style: ElevatedButton.styleFrom(
                                    primary: kbuttonColor,
                                    shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(8))),
                              ),
                            ),
                          ],
                        )),
                    heightspace(20),
                    password.text != ""
                        ? const Text(
                            "Password",
                            style: TextStyle(
                                color: ktextcolor,
                                fontSize: 16,
                                fontWeight: FontWeight.w300),
                          )
                        : SizedBox(),

                    password.text != ""
                        ? Container(
                            width: screenWidth,
                            child: TextFormField(
                                obscureText: visibletext,
                                controller: password,
                                style: TextStyle(
                                  color: ktextcolor,
                                  fontSize: 14,
                                ),
                                readOnly: true,
                                decoration: InputDecoration(
                                    focusedBorder: InputBorder.none,
                                    suffixIcon: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        visibletext
                                            ? IconButton(
                                                padding: EdgeInsets.only(
                                                    bottom: 8.0, left: 20.0),
                                                onPressed: () {
                                                  setState(() {
                                                    visibility();
                                                  });
                                                },
                                                icon: const Icon(
                                                  Icons.visibility,
                                                  color: Colors.grey,
                                                ))
                                            : IconButton(
                                                padding: EdgeInsets.only(
                                                    bottom: 8.0, left: 20.0),
                                                onPressed: () {
                                                  setState(() {
                                                    visibility();
                                                  });
                                                },
                                                icon: const Icon(
                                                  Icons.visibility_off,
                                                  color: Colors.grey,
                                                )),
                                        IconButton(
                                            padding: EdgeInsets.only(
                                                bottom: 8.0, left: 0.0),
                                            onPressed: () {
                                              Clipboard.setData(ClipboardData(
                                                  text: password.text));
                                              final snackBar = SnackBar(
                                                content:
                                                    Text("Copied to Clipboard"),
                                                backgroundColor:
                                                    Colors.grey.shade600,
                                              );
                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(snackBar);
                                            },
                                            icon: const Icon(
                                              Icons.copy_rounded,
                                              color: Colors.grey,
                                            )),
                                      ],
                                    ),
                                    border: InputBorder.none)),
                          )
                        : SizedBox(),

                    // ElevatedButton(
                    //   onPressed: () {
                    //     Clipboard.setData(ClipboardData(text: password.text));
                    //     const snackBar =
                    //         SnackBar(content: Text("Copied to Clipboard"));
                    //     ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    //   },
                    //   child: const Text(
                    //     "Copy",
                    //     style: TextStyle(
                    //       color: Colors.white,
                    //       fontSize: 16,
                    //       fontFamily: 'TitilliumWeb',
                    //     ),
                    //   ),
                    //   style: ElevatedButton.styleFrom(
                    //       padding: const EdgeInsets.symmetric(
                    //           vertical: 10, horizontal: 20),
                    //       primary: Colors.grey.shade500),
                    // ),
                  ],
                ),
              ),
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
}
