import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/old_pass_screen.dart';
import 'package:offlinepass/screens/pass_summary_screen.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/components/string_extension.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RenewPassword extends StatefulWidget {
  // final String url;
  // final String email;

  // final String password;
  final PassModel passModel;
  RenewPassword({
    required this.passModel,
    Key? key,
  }) : super(key: key);

  @override
  _RenewPasswordState createState() => _RenewPasswordState();
}

class _RenewPasswordState extends State<RenewPassword> {
  final DbOperation _dbOperation = PassOperation();
  late TextEditingController password;
  TextEditingController newPassword = TextEditingController();
  bool isGenerated = false;
  PasswordManager passwordManager = PasswordManager();
  bool visibletext = true;
  bool visiblenewPass = true;
  bool visibleOldPass = true;
  bool isDeleted = false;
  late String pswd;

  late int validDays = passwordManager.validDays();
  @override
  void initState() {
    // TODO: implement initState
    pswd = passwordManager.generatePassword(
        passModel: widget.passModel,
        currentTimeStamp: DateTime.now().millisecondsSinceEpoch ~/ 1000);
    password = TextEditingController(text: pswd);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kprimarycolor,
        iconTheme: const IconThemeData(color: Colors.white),
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: IconButton(
            onPressed: () {
              Navigator.pop(context, isDeleted);
            },
            icon: const Icon(
              Icons.arrow_back,
            )),
        title: Text(
          widget.passModel.url!.capitalize(),
        ),
        actions: [
          PopupMenuButton(
              onSelected: (value) async {
                if (value == 0) {
                  // getDatas.datas.remove(widget.data);
                  isDeleted = true;
                  await _dbOperation.remove(widget.passModel);
                  bool result = await _dbOperation.isEmpty();

                  // if (result) {
                  //   passwordManager.cancelNotification();
                  // }
                  final snackBar = SnackBar(
                    content: Text(
                        "${widget.passModel.url!.substring(0, widget.passModel.url!.length - 4).capitalize()} deleted successfully"),
                    backgroundColor: Colors.grey.shade500,
                  );
                  ScaffoldMessenger.of(context).showSnackBar(snackBar);
                  Navigator.pop(context, isDeleted);
                } else if (value == 1) {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              OldPassword(passModel: widget.passModel)));
                } else if (value == 2) {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              Passsummary(passModel: widget.passModel)));
                }
              },
              padding: const EdgeInsets.all(4.0),
              icon: Icon(
                Icons.more_vert,
                color: Colors.white,
              ),
              //iconSize: 30,
              itemBuilder: (BuildContext context) => [
                    PopupMenuItem(
                      value: 0,
                      child: Text(
                        widget.passModel.url!.contains('.com')
                            ? "Delete ${widget.passModel.url!.substring(0, widget.passModel.url!.length - 4).capitalize()}"
                            : "Delete ${widget.passModel.url!.capitalize()}",
                        style: TextStyle(
                            fontSize: 15,
                            //  fontFamily: 'TitilliumWeb',
                            color: Colors.black,
                            fontWeight: FontWeight.w400),
                      ),
                    ),
                    const PopupMenuItem(
                      value: 1,
                      child: Text(
                        "Old Passwords",
                        style: TextStyle(
                            fontSize: 15,
                            color: Colors.black,
                            fontWeight: FontWeight.w400),
                      ),
                    ),
                    const PopupMenuItem(
                      value: 2,
                      child: Text(
                        "Password Summary",
                        style: TextStyle(
                            fontSize: 15,
                            color: Colors.black,
                            fontWeight: FontWeight.w400),
                      ),
                    ),
                  ])

          //   IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              width: screenWidth,
              color:
                  passwordManager.checkValidity(passModel: widget.passModel) &&
                          validDays > 1
                      ? Colors.green.shade400
                      : Colors.red,
              padding: const EdgeInsets.only(left: 15.0, top: 5, bottom: 5),
              child: Text(
                !passwordManager.checkValidity(passModel: widget.passModel) ||
                        validDays <= 0
                    ? "Your Password has been expired."
                    : "Expires in ${passwordManager.validDays()} days",
                style: TextStyle(
                  color: Colors.white,
                  fontStyle: FontStyle.italic,
                  fontSize: 15,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: screenWidth,
                    child: Row(
                      children: [
                        Container(
                            height: 45,
                            width: 45,
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(8),
                                color: widget.passModel.colorIndex != null
                                    ? colors[widget.passModel.colorIndex!]
                                    : icons[widget.passModel.url]!['color']),
                            child: widget.passModel.colorIndex != null
                                ? Center(
                                    child: Text(
                                      widget.passModel.url!
                                          .substring(0, 2)
                                          .toUpperCase(),
                                      style: const TextStyle(
                                          fontWeight: FontWeight.w500,
                                          fontSize: 18,
                                          color: Colors.white),
                                    ),
                                  )
                                : Icon(
                                    icons[widget.passModel.url]!['icon'],
                                    color: Colors.white,
                                    size: 26,
                                  )),
                        widthspace(20),
                        Flexible(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                widget.passModel.url!.contains('.com')
                                    ? widget.passModel.url!
                                        .substring(
                                            0, widget.passModel.url!.length - 4)
                                        .toString()
                                        .capitalize()
                                    : widget.passModel.url!
                                        .toString()
                                        .capitalize(),
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 16,
                                  // fontFamily: 'TitilliumWeb',
                                ),
                              ),
                              //  heightspace(5),
                              Text(
                                widget.passModel.user!,
                                style: const TextStyle(
                                    fontSize: 15,
                                    //  fontFamily: 'TitilliumWeb',
                                    //fontStyle: FontStyle.italic,
                                    color: Colors.grey,
                                    fontWeight: FontWeight.w400),
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  heightspace(20),
                  const Text(
                    "Password",
                    style: TextStyle(
                      color: ktextcolor,
                      fontSize: 16,
                      //fontFamily: 'TitilliumWeb',
                      // fontWeight: FontWeight.w300
                    ),
                  ),
                  Container(
                    width: screenWidth,
                    child: TextFormField(
                        obscureText: visibletext,
                        controller: password,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 14,
                          // fontFamily: 'TitilliumWeb',
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
                                    padding:
                                        EdgeInsets.only(bottom: 8.0, left: 0.0),
                                    onPressed: () {
                                      Clipboard.setData(
                                          ClipboardData(text: password.text));
                                      final snackBar = SnackBar(
                                        content: Text("Copied to Clipboard"),
                                        backgroundColor: Colors.grey.shade600,
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
                  ),
                  const Text(
                    "Help ?",
                    style: TextStyle(
                        fontSize: 14,
                        fontFamily: 'TitilliumWeb',
                        fontWeight: FontWeight.bold),
                  ),
                  heightspace(10),
                  const Text("Password compromised or needs change?"),
                  heightspace(15),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        isGenerated = true;
                        pswd = passwordManager.generatePassword(
                            newPass: true,
                            passModel: widget.passModel,
                            currentTimeStamp:
                                DateTime.now().millisecondsSinceEpoch ~/ 1000);
                        newPassword.text = pswd;

                        // final snackBar = SnackBar(
                        //   content:
                        //       Text("Password generated successfully"),
                        //   backgroundColor: Colors.grey.shade600,
                        // );
                        // ScaffoldMessenger.of(context)
                        //     .showSnackBar(snackBar);
                      });
                      showDialog(
                          context: context,
                          barrierDismissible: false,
                          builder: (context) {
                            return StatefulBuilder(
                                builder: (context, setstate) {
                              return conformDialog(setstate);
                            });
                          });
                      // showDialog(
                      //     context: this.context,
                      //     builder: (context) => conformDialog());
                    },
                    child: const Text(
                      "New Password",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w400),
                    ),
                    style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 30),
                        primary: kbuttonColor),
                  ),
                  heightspace(15),
                  // isGenerated
                  //     ? const Text(
                  //         "New Password",
                  //         style: TextStyle(
                  //           color: ktextcolor,
                  //           fontSize: 16,
                  //           //fontFamily: 'TitilliumWeb',
                  //           // fontWeight: FontWeight.w300
                  //         ),
                  //       )
                  //     : SizedBox(),
                  // isGenerated
                  //     ? Container(
                  //         width: screenWidth,
                  //         child: TextFormField(
                  //             obscureText: visiblenewPass,
                  //             controller: newPassword,
                  //             style: TextStyle(
                  //               color: Colors.black,
                  //               fontSize: 14,
                  //               // fontFamily: 'TitilliumWeb',
                  //             ),
                  //             readOnly: true,
                  //             decoration: InputDecoration(
                  //                 focusedBorder: InputBorder.none,
                  //                 suffixIcon: Row(
                  //                   mainAxisSize: MainAxisSize.min,
                  //                   children: [
                  //                     visiblenewPass
                  //                         ? IconButton(
                  //                             padding: EdgeInsets.only(
                  //                                 bottom: 8.0, left: 20.0),
                  //                             onPressed: () {
                  //                               setState(() {
                  //                                 visiblenewPass =
                  //                                     !visiblenewPass;
                  //                               });
                  //                             },
                  //                             icon: const Icon(
                  //                               Icons.visibility,
                  //                               color: Colors.grey,
                  //                             ))
                  //                         : IconButton(
                  //                             padding: EdgeInsets.only(
                  //                                 bottom: 8.0, left: 20.0),
                  //                             onPressed: () {
                  //                               setState(() {
                  //                                 visiblenewPass =
                  //                                     !visiblenewPass;
                  //                               });
                  //                             },
                  //                             icon: const Icon(
                  //                               Icons.visibility_off,
                  //                               color: Colors.grey,
                  //                             )),
                  //                     IconButton(
                  //                         padding: EdgeInsets.only(
                  //                             bottom: 8.0, left: 0.0),
                  //                         onPressed: () {
                  //                           Clipboard.setData(ClipboardData(
                  //                               text: newPassword.text));
                  //                           final snackBar = SnackBar(
                  //                             content:
                  //                                 Text("Copied to Clipboard"),
                  //                             backgroundColor:
                  //                                 Colors.grey.shade600,
                  //                           );
                  //                           ScaffoldMessenger.of(context)
                  //                               .showSnackBar(snackBar);
                  //                         },
                  //                         icon: const Icon(
                  //                           Icons.copy_rounded,
                  //                           color: Colors.grey,
                  //                         )),
                  //                   ],
                  //                 ),
                  //                 border: InputBorder.none)),
                  //       )
                  //     : SizedBox(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  AlertDialog conformDialog(StateSetter setstate) {
    return AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        content: Container(
          // height: 170,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              //  SizedBox(height: 10),
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                    onPressed: () async {
                      var data =
                          widget.passModel.toMap(passModel: widget.passModel);
                      SharedPreferences preferences =
                          await SharedPreferences.getInstance();
                      int? index = preferences.getInt("$data");
                      index = index! - 1;
                      preferences.setInt("$data", index);
                      setState(() {
                        visibleOldPass = true;
                        visiblenewPass = true;
                      });

                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.clear)),
              ),
              const Text(
                "Old Password",
                style: TextStyle(
                    // color: ktextcolor,
                    fontSize: 16,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.w300),
              ),
              heightspace(10),
              Container(
                width: screenWidth,
                child: TextFormField(
                    obscureText: visibleOldPass,
                    controller: password,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 14,
                      // fontFamily: 'TitilliumWeb',
                    ),
                    readOnly: true,
                    decoration: InputDecoration(
                        focusedBorder: InputBorder.none,
                        suffixIcon: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            visibleOldPass
                                ? IconButton(
                                    padding: EdgeInsets.only(
                                        bottom: 8.0, left: 20.0),
                                    onPressed: () {
                                      setstate(() {
                                        visibleOldPass = !visibleOldPass;
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
                                      setstate(() {
                                        visibleOldPass = !visibleOldPass;
                                      });
                                    },
                                    icon: const Icon(
                                      Icons.visibility_off,
                                      color: Colors.grey,
                                    )),
                            IconButton(
                                padding:
                                    EdgeInsets.only(bottom: 8.0, left: 0.0),
                                onPressed: () {
                                  Clipboard.setData(
                                      ClipboardData(text: newPassword.text));
                                  final snackBar = SnackBar(
                                    content: Text("Copied to Clipboard"),
                                    backgroundColor: Colors.grey.shade600,
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
              ),
              heightspace(20),
              const Text(
                "New Password",
                style: TextStyle(
                    // color: ktextcolor,
                    fontSize: 16,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.w300),
              ),
              heightspace(10),
              Container(
                width: screenWidth,
                child: TextFormField(
                    obscureText: visiblenewPass,
                    controller: newPassword,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 14,
                      // fontFamily: 'TitilliumWeb',
                    ),
                    readOnly: true,
                    decoration: InputDecoration(
                        focusedBorder: InputBorder.none,
                        suffixIcon: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            visiblenewPass
                                ? IconButton(
                                    padding: EdgeInsets.only(
                                        bottom: 8.0, left: 20.0),
                                    onPressed: () {
                                      setstate(() {
                                        visiblenewPass = !visiblenewPass;
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
                                      setstate(() {
                                        visiblenewPass = !visiblenewPass;
                                      });
                                    },
                                    icon: const Icon(
                                      Icons.visibility_off,
                                      color: Colors.grey,
                                    )),
                            IconButton(
                                padding:
                                    EdgeInsets.only(bottom: 8.0, left: 0.0),
                                onPressed: () {
                                  Clipboard.setData(
                                      ClipboardData(text: newPassword.text));
                                  final snackBar = SnackBar(
                                    content: Text("Copied to Clipboard"),
                                    backgroundColor: Colors.grey.shade600,
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
              ),
              heightspace(20),
              Text(
                "Have  you changed your password ?",
                textAlign: TextAlign.center,
                style: const TextStyle(
                    // color: ktextcolor,
                    fontSize: 16,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.w300),
              ),
              heightspace(20),
              Center(
                child: ElevatedButton(
                    onPressed: () {
                      setState(() {
                        password.text = newPassword.text;

                        visibleOldPass = true;
                        visiblenewPass = true;
                      });
                      Navigator.pop(this.context);
                    },
                    style: ElevatedButton.styleFrom(
                        primary: kbuttonColor,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50, vertical: 10)),
                    child: Text("Yes")),
              )
            ],
          ),
        ));
  }

  void visibility() {
    setState(() {
      visibletext = !visibletext;
    });
  }
}
