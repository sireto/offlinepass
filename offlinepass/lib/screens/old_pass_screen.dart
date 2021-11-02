import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';

import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/pass_operation.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/components/string_extension.dart';

class OldPassword extends StatefulWidget {
  // final String url;
  // final String email;

  // final String password;
  final PassModel passModel;
  OldPassword({
    required this.passModel,
    Key? key,
  }) : super(key: key);

  @override
  _OldPasswordState createState() => _OldPasswordState();
}

class _OldPasswordState extends State<OldPassword> {
  PasswordManager _passwordManager = PasswordManager();
  late int count;
  final initialdate = DateTime.now();
  late String _startDate =
      DateFormat("yyyy-MM-dd").format(initialdate.subtract(Duration(days: 90)));
  late String _endDate = DateFormat("yyyy-MM-dd").format(initialdate);
  String? selectdate;
  @override
  void initState() {
    // TODO: implement initState
    count = PasswordManager.preferences
        .getInt('${widget.passModel.toMap(passModel: widget.passModel)}')!;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kprimarycolor,
        iconTheme: const IconThemeData(color: Colors.white),
        centerTitle: false,
        leading: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: const Icon(
              Icons.arrow_back,
            )),
        automaticallyImplyLeading: false,
        title: Text(
          "Old Passwords",
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: count == 0
            ? Container(
                child: Text(
                  "You haven't changed your password. Once your password is changed, you can view your old passwords here.",
                  style: TextStyle(
                      color: Colors.grey,
                      fontSize: 15,
                      fontFamily: "TitilliumWeb",
                      fontWeight: FontWeight.w400),
                ),
              )
            : Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Container(
                  width: screenWidth,
                  child: Row(
                    children: [
                      Container(
                          height: 45,
                          width: 45,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              color: icons[widget.passModel.url]!['color']),
                          child: Icon(
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
                              widget.passModel.url!
                                  .substring(
                                      0, widget.passModel.url!.length - 4)
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
                              widget.passModel.user!,
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
                heightspace(20),
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Passwords :",
                          style: TextStyle(
                              color: ktextcolor,
                              fontSize: 16,
                              // fontFamily: 'TitilliumWeb',
                              fontWeight: FontWeight.w500),
                        ),
                        Row(
                          children: [
                            selectdate == null
                                ? Text(DateFormat("MMM dd yyyy")
                                    .format(initialdate))
                                : Text(selectdate!),
                            // ElevatedButton(
                            //     onPressed: () {
                            //       print(initialdate);
                            //       print(_startDate);
                            //       print(_endDate);
                            //       pickdate();
                            //       // print(selectdate);
                            //     },
                            //     style:
                            //         ElevatedButton.styleFrom(primary: kbuttonColor),
                            //     //pickdate,
                            //     child: selectdate == null
                            //         ? Text(DateFormat("MMM dd yyyy")
                            //             .format(initialdate))
                            //         : Text(selectdate!)),
                            widthspace(10),
                            IconButton(
                                onPressed: pickdate,
                                icon: const Icon(FontAwesomeIcons.calendar))
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
                heightspace(10),
                ListView.builder(
                  itemCount: count > 3 ? 3 : count,
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemBuilder: (context, index) => Container(
                    width: screenWidth,
                    child: TextFormField(
                        initialValue: _passwordManager.generatePassword(
                            passModel: widget.passModel, index: index),
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
                                    bottom: 8.0, left: 0.0, top: 0.0),
                                onPressed: () {
                                  Clipboard.setData(ClipboardData(
                                      text: _passwordManager.generatePassword(
                                          passModel: widget.passModel,
                                          index: index)));
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
                            border: InputBorder.none)),
                  ),
                ),
              ]),
      ),
    );
  }

  Future pickdate() async {
    final newdate = await showDatePicker(
        context: context,
        initialDate: DateTime.parse(_startDate),
        firstDate: DateTime.parse(_startDate),
        initialEntryMode: DatePickerEntryMode.calendar,
        lastDate: DateTime.parse(_endDate));

    if (newdate == null) return;
    setState(() {
      // isChanged = true;
      selectdate = DateFormat("MMM dd yyyy").format(newdate);
      print(selectdate);
      // _startDate = DateFormat("yyyy-MM-dd").format(newdate);
      // _endDate =
      //     DateFormat("yyyy-MM-dd").format(newdate.add(Duration(days: 14)));
    });
  }

  // void visibility() {
  //   setState(() {
  //     visibletext = !visibletext;
  //   });
  // }
}
