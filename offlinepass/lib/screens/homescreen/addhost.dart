import 'dart:convert';
import 'dart:math';

import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_keyboard_visibility/flutter_keyboard_visibility.dart';
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
  final datas;
  const Addhost({Key? key, required this.datas}) : super(key: key);

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
  FocusNode _urlFocusNode = FocusNode();

  bool visibletext = true;
  List<String> url = [
    "facebook.com",
    "gmail.com",
    "yahoo.com",
    "reddit.com",
    "twitch.com",
    "twitter.com",
    "telegram.com",
    "linkedin.com"
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

  var checkindex = 0;
  Color currentcolor = Colors.red;
  @override
  void dispose() {
    // TODO: implement dispose
    password.dispose();
    _urlFocusNode.dispose();

    appSiteUrl.dispose();
    usernameEmailPhone.dispose();
    super.dispose();
  }

  final _key = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return KeyboardVisibilityBuilder(builder: (context, isKeyboardVisibile) {
      return GestureDetector(
          onTap: () {
            setState(() {
              appSiteUrl.text = appSiteUrl.text;
            });

            _urlFocusNode.unfocus();
          },
          child: WillPopScope(
              onWillPop: () {
                Navigator.pop(context, passModel);
                return Future.value(true);
              },
              child: Scaffold(
                appBar: AppBar(
                  backgroundColor: kprimarycolor,
                  centerTitle: false,
                  automaticallyImplyLeading: true,
                  title: const Text(
                    "Add an App or Website",
                  ),
                ),
                body: SingleChildScrollView(
                  child: Column(
                    children: [
                      password.text != ""
                          ? Container(
                              width: screenWidth,
                              color: Colors.green.shade400,
                              padding: const EdgeInsets.only(
                                  left: 15.0, top: 12.0, bottom: 12.0),
                              child: Text(
                                "Expires in ${passwordManager.validDays()} days",
                                style: const TextStyle(
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
                                                  .contains(
                                                      pattern.toLowerCase()))
                                              .toList();
                                        },
                                        transitionBuilder: (context,
                                            suggestionsBox, controller) {
                                          return suggestionsBox;
                                        },
                                        hideSuggestionsOnKeyboardHide: true,
                                        textFieldConfiguration:
                                            TextFieldConfiguration(
                                                controller: appSiteUrl,
                                                focusNode: _urlFocusNode,
                                                cursorColor: kprimarycolor,
                                                onEditingComplete: () {
                                                  setState(() {
                                                    appSiteUrl.text =
                                                        appSiteUrl.text;
                                                    _urlFocusNode.unfocus();
                                                  });
                                                },
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
                                                scrollPadding:
                                                    const EdgeInsets.only(
                                                        bottom: 250),
                                                decoration: InputDecoration(
                                                  labelText: "App/Site URL",
                                                  focusedBorder:
                                                      OutlineInputBorder(
                                                    borderSide:
                                                        const BorderSide(
                                                            color:
                                                                kprimarycolor),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            8),
                                                  ),
                                                  labelStyle: const TextStyle(
                                                      fontSize: 16,
                                                      color: Colors.grey,
                                                      fontFamily:
                                                          'TitilliumWeb'),
                                                  border: OutlineInputBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            8),
                                                  ),
                                                  suffixIcon: Icon(
                                                    Icons
                                                        .arrow_drop_down_outlined,
                                                    size: 30,
                                                    color: url.contains(
                                                            appSiteUrl.text)
                                                        ? Colors.grey
                                                        : Colors.white,
                                                  ),
                                                )),
                                        itemBuilder: (context, suggestion) {
                                          //  print(suggestion!.statename);
                                          return ListTile(
                                            title: Text(suggestion.toString()),
                                          );
                                        },
                                        noItemsFoundBuilder: (context) =>
                                            Container(
                                              height: 50,
                                              child: const Center(
                                                child: Text(
                                                  "Not listed",
                                                  style:
                                                      TextStyle(fontSize: 15),
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
                                      //   focusNode: _urserFocusNode,
                                      onTap: () {
                                        setState(() {
                                          appSiteUrl.text = appSiteUrl.text;
                                        });
                                      },
                                      style: const TextStyle(
                                        fontSize: 16,
                                        color: Colors.black87,
                                        // fontFamily: 'TitilliumWeb'
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
                                            borderSide: const BorderSide(
                                                color: kprimarycolor),
                                            borderRadius:
                                                BorderRadius.circular(8),
                                          ),
                                          labelText: "Username/email or phone",
                                          labelStyle: const TextStyle(
                                              fontSize: 16,
                                              color: Colors.grey,
                                              fontFamily: 'TitilliumWeb'),
                                          border: OutlineInputBorder(
                                            borderSide: const BorderSide(
                                                color: Colors.black),
                                            borderRadius:
                                                BorderRadius.circular(8),
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
                                                scrollDirection:
                                                    Axis.horizontal,
                                                itemCount: colors.length,
                                                itemBuilder: (context, index) {
                                                  return InkWell(
                                                    onTap: () {
                                                      print(colors[index]);
                                                      setState(() {
                                                        checkindex = index;
                                                        currentcolor =
                                                            colors[index];
                                                      });
                                                    },
                                                    child: Container(
                                                      height: 50,
                                                      width: 50,
                                                      margin:
                                                          const EdgeInsets.only(
                                                              right: 10),
                                                      decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(8),
                                                        // shape: BoxShape.circle,
                                                        color: colors[index],
                                                      ),
                                                      child: Center(
                                                          child: appSiteUrl
                                                                      .text !=
                                                                  ""
                                                              ? appSiteUrl.text
                                                                          .length >
                                                                      2
                                                                  ? checkindex ==
                                                                          index
                                                                      ? Text(
                                                                          appSiteUrl
                                                                              .text
                                                                              .substring(0, 2)
                                                                              .toUpperCase(),
                                                                          style: const TextStyle(
                                                                              fontWeight: FontWeight.w500,
                                                                              fontSize: 18,
                                                                              color: Colors.white),
                                                                          textAlign:
                                                                              TextAlign.center,
                                                                        )
                                                                      : null
                                                                  : checkindex ==
                                                                          index
                                                                      ? const Center(
                                                                          child: Icon(Icons
                                                                              .check))
                                                                      : null
                                                              : checkindex ==
                                                                      index
                                                                  ? const Center(
                                                                      child: Icon(
                                                                          Icons
                                                                              .check))
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
                                            if (password.text == "") {
                                              print(appSiteUrl.text);
                                              print(usernameEmailPhone.text);
                                              passModel = PassModel(
                                                url: appSiteUrl.text,
                                                user: usernameEmailPhone.text,
                                              );
                                              // fails logic

                                              // bool result = await _dbOperation
                                              //     .contain(passModel);
                                              // List datas = [];
                                              // datas.forEach((element) { })
                                              print(appSiteUrl.text);
                                              print(widget.datas);
                                              var results = widget.datas
                                                  .map((element) => element.url
                                                                  .toString()
                                                                  .toLowerCase() ==
                                                              appSiteUrl.text
                                                                  .toLowerCase() &&
                                                          element.user ==
                                                              usernameEmailPhone
                                                                  .text
                                                      ? true
                                                      : false)
                                                  .toList();
                                              print(results);
                                              if (results.contains(true)) {
                                                final snackBar = SnackBar(
                                                  content: const Text(
                                                      "Host and username already exist"),
                                                  backgroundColor:
                                                      Colors.grey.shade500,
                                                  duration:
                                                      Duration(seconds: 1),
                                                );
                                                ScaffoldMessenger.of(context)
                                                    .showSnackBar(snackBar);
                                              } else {
                                                if (!url.contains(
                                                        appSiteUrl.text) &&
                                                    appSiteUrl.text != "") {
                                                  passModel.colorIndex =
                                                      checkindex;
                                                }
                                                passModel.id =
                                                    await _dbOperation
                                                        .add(passModel);
                                                print(passModel.toMap(
                                                    passModel: passModel));
                                                final snackBar = SnackBar(
                                                  content: const Text(
                                                      "Password generated successfully"),
                                                  backgroundColor:
                                                      Colors.grey.shade500,
                                                  duration:
                                                      Duration(seconds: 1),
                                                );
                                                ScaffoldMessenger.of(context)
                                                    .showSnackBar(snackBar);
                                                setState(() {
                                                  password.text = passwordManager
                                                      .generatePassword(
                                                          generate: true,
                                                          passModel: passModel,
                                                          currentTimeStamp:
                                                              DateTime.now()
                                                                      .millisecondsSinceEpoch ~/
                                                                  1000);
                                                });
                                              }
                                            } else {
                                              final snackBar = SnackBar(
                                                content: const Text(
                                                    "Password already generated"),
                                                backgroundColor:
                                                    Colors.grey.shade500,
                                                duration: Duration(seconds: 1),
                                              );
                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(snackBar);
                                              // setState(() {
                                              //   password.text = passwordManager
                                              //       .generatePassword(
                                              //           generate: true,
                                              //           passModel: passModel,
                                              //           currentTimeStamp: DateTime
                                              //                       .now()
                                              //                   .millisecondsSinceEpoch ~/
                                              //               1000);
                                              // });
                                            }
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
                                                        padding:
                                                            EdgeInsets.only(
                                                                bottom: 8.0,
                                                                left: 20.0),
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
                                                        padding:
                                                            EdgeInsets.only(
                                                                bottom: 8.0,
                                                                left: 20.0),
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
                                                      Clipboard.setData(
                                                          ClipboardData(
                                                              text: password
                                                                  .text));
                                                      final snackBar = SnackBar(
                                                        content: Text(
                                                            "Copied to Clipboard"),
                                                        backgroundColor: Colors
                                                            .grey.shade600,
                                                        duration: Duration(
                                                            seconds: 1),
                                                      );
                                                      ScaffoldMessenger.of(
                                                              context)
                                                          .showSnackBar(
                                                              snackBar);
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
              )));
    });
  }

  void visibility() {
    setState(() {
      visibletext = !visibletext;
    });
  }
}
