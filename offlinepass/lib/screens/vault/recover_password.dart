import 'dart:convert';
import 'dart:math';

import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_keyboard_visibility/flutter_keyboard_visibility.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';

import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:offlinepass/themes.dart';
import 'package:sembast/timestamp.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Recoverpassword extends StatefulWidget {
  final String rmsk;
  const Recoverpassword({Key? key, required this.rmsk}) : super(key: key);

  @override
  _RecoverpasswordState createState() => _RecoverpasswordState();
}

class _RecoverpasswordState extends State<Recoverpassword> {
  final DbOperation _dbOperation = PassOperation();
  final initialdate = DateTime.now();
  late String _startDate =
      DateFormat("yyyy-MM-dd").format(initialdate.subtract(Duration(days: 90)));
  late String _endDate = DateFormat("yyyy-MM-dd").format(initialdate);
  String? selectdate;
  String? newInitialDate;
  int? currentTimeStamp;
  int count = 0;
  //String pass = "";

  PassModel passModel = PassModel();
  PasswordManager passwordManager = PasswordManager();
  TextEditingController password = TextEditingController();
  TextEditingController appSiteUrl = TextEditingController();
  TextEditingController usernameEmailPhone = TextEditingController();
  FocusNode _urlFocusNode = FocusNode();
  bool visibletext = true;
  List<String> url = [
    "Facebook.com",
    "Gmail.com",
    "Yahoo.com",
    "Reddit.com",
    "Twitch.com",
    "Twitter.com",
    "Telegram.com",
    "Linkedin.com"
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
  void initState() {
    // TODO: implement initState
    currentTimeStamp = DateTime.now().millisecondsSinceEpoch;
    super.initState();
  }

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
          child: Scaffold(
            appBar: AppBar(
              backgroundColor: kprimarycolor,
              centerTitle: false,
              automaticallyImplyLeading: true,
              title: const Text(
                "Recover Password",
              ),
            ),
            body: SingleChildScrollView(
              child: Column(
                children: [
                  // password.text != ""
                  //     ? Container(
                  //         width: screenWidth,
                  //         color: Colors.green.shade400,
                  //         padding: const EdgeInsets.only(
                  //             left: 15.0, top: 12.0, bottom: 12.0),
                  //         child: const Text(
                  //           "Expires in 2 days.",
                  //           style: TextStyle(
                  //             color: Colors.white,
                  //             fontStyle: FontStyle.italic,
                  //             fontSize: 15,
                  //             fontWeight: FontWeight.w300,
                  //           ),
                  //         ),
                  //       )
                  //     : SizedBox(),
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
                                              focusedBorder: OutlineInputBorder(
                                                borderSide: const BorderSide(
                                                    color: kprimarycolor),
                                                borderRadius:
                                                    BorderRadius.circular(8),
                                              ),
                                              labelStyle: const TextStyle(
                                                  fontSize: 16,
                                                  color: Colors.grey,
                                                  fontFamily: 'TitilliumWeb'),
                                              border: OutlineInputBorder(
                                                borderRadius:
                                                    BorderRadius.circular(8),
                                              ),
                                              suffixIcon: Icon(
                                                Icons.arrow_drop_down_outlined,
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
                                      return knullEmail;
                                    }
                                    return null;
                                  },
                                  decoration: InputDecoration(
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: const BorderSide(
                                            color: kprimarycolor),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      labelText: "Username/email or phone",
                                      labelStyle: const TextStyle(
                                          fontSize: 16,
                                          color: Colors.grey,
                                          fontFamily: 'TitilliumWeb'),
                                      border: OutlineInputBorder(
                                        borderSide: const BorderSide(
                                            color: Colors.black),
                                        borderRadius: BorderRadius.circular(8),
                                      )),
                                ),
                                heightspace(20),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Text(
                                        selectdate ??
                                            DateFormat("MMM dd yyyy")
                                                .format(initialdate),
                                        style: const TextStyle(
                                            color: ktextcolor,
                                            fontSize: 16,
                                            fontFamily: 'TitilliumWeb'),
                                      ),
                                    ),
                                    IconButton(
                                        onPressed: pickdate,
                                        icon: const Icon(
                                            FontAwesomeIcons.calendar))
                                  ],
                                ),
                                heightspace(20),
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
                                        );

                                        print(
                                            "${passModel.url},${passModel.user}");
                                        setState(() {
                                          count++;

                                          password.text == ""
                                              ? password.text = passwordManager
                                                  .recoverPassword(
                                                      passModel: passModel,
                                                      rmsk: widget.rmsk,
                                                      currentTimeStamp:
                                                          currentTimeStamp!,
                                                      index: 0)
                                              : null;
                                          print(password.text);
                                        });

                                        // passModel.id = await _dbOperation
                                        //     .add(passModel);
                                        // final snackBar = SnackBar(
                                        //   content: Text(
                                        //       "Password generated successfully"),
                                        //   duration:
                                        //       Duration(milliseconds: 500),
                                        //   backgroundColor:
                                        //       Colors.grey.shade500,
                                        // );
                                        // ScaffoldMessenger.of(context)
                                        //     .showSnackBar(snackBar);
                                        // setState(() {
                                        //   password.text = passwordManager
                                        //       .generatePassword(
                                        //           generate: true,
                                        //           passModel: passModel);
                                        // });
                                      }
                                    },
                                    child: const Text(
                                      "Recover Password",
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
                            ? ListView.builder(
                                itemCount: count > 3 ? 3 : count,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) => Container(
                                  width: screenWidth,
                                  child: TextFormField(
                                      initialValue:
                                          passwordManager.recoverPassword(
                                              passModel: passModel,
                                              rmsk: widget.rmsk,
                                              currentTimeStamp:
                                                  currentTimeStamp!,
                                              index: index),
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 14,
                                        // fontFamily: 'TitilliumWeb',
                                      ),
                                      readOnly: true,
                                      decoration: InputDecoration(
                                          focusedBorder: InputBorder.none,
                                          suffixIcon: IconButton(
                                              padding: EdgeInsets.only(
                                                  bottom: 8.0,
                                                  left: 0.0,
                                                  top: 0.0),
                                              onPressed: () {
                                                Clipboard.setData(ClipboardData(
                                                  text: passwordManager
                                                      .recoverPassword(
                                                          passModel: passModel,
                                                          rmsk: widget.rmsk,
                                                          currentTimeStamp:
                                                              currentTimeStamp!,
                                                          index: index),
                                                ));
                                                final snackBar = SnackBar(
                                                  content: Text(
                                                      "Copied to Clipboard"),
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
                                          border: InputBorder.none)),
                                ),
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
          ));
    });
  }

  Future pickdate() async {
    final newdate = await showDatePicker(
        context: context,
        initialDate: DateTime.parse(newInitialDate ?? _endDate),
        firstDate: DateTime.parse(_startDate),
        initialEntryMode: DatePickerEntryMode.calendar,
        lastDate: DateTime.parse(_endDate));

    if (newdate == null) return;
    setState(() {
      // isChanged = true;
      newInitialDate = DateFormat("yyyy-MM-dd").format(newdate);
      selectdate = DateFormat("MMM dd yyyy").format(newdate);
      print(selectdate);
      currentTimeStamp = DateTime.parse(newInitialDate!).millisecondsSinceEpoch;

      // _startDate = DateFormat("yyyy-MM-dd").format(newdate);
      // _endDate =
      //     DateFormat("yyyy-MM-dd").format(newdate.add(Duration(days: 14)));
    });
  }

  void visibility() {
    setState(() {
      visibletext = !visibletext;
    });
  }
}
