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
  late String _startDate = DateFormat("yyyy-MM-dd")
      .format(initialdate.subtract(Duration(days: 365)));
  late String _endDate = DateFormat("yyyy-MM-dd").format(initialdate);
  String? selectdate;
  String? newInitialDate;
  int? currentTimeStamp;
  bool showMore = false;
  bool isDateChange = false;
  bool generateMore = false;
  @override
  void initState() {
    // TODO: implement initState
    count = PasswordManager.preferences
        .getInt('${widget.passModel.toMap(passModel: widget.passModel)}')!;
    currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    currentTimeStamp = (currentTimeStamp! ~/ PasswordManager.passwordValidity) *
        PasswordManager.passwordValidity;
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
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
                              : widget.passModel.url!.toString().capitalize(),
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
                            ? Text(
                                DateFormat("MMM dd yyyy").format(initialdate))
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
            count == 0
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
                : ListView.builder(
                    itemCount: showMore || generateMore
                        ? count
                        : count > 3
                            ? 3
                            : count,
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemBuilder: (context, index) => Container(
                      width: screenWidth,
                      child: TextFormField(
                          initialValue: _passwordManager.generatePassword(
                              passModel: widget.passModel,
                              index: index,
                              currentTimeStamp: currentTimeStamp!),
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
                                            index: index,
                                            currentTimeStamp:
                                                currentTimeStamp!)));
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
            newInitialDate == null
                ? count > 3
                    ? TextButton(
                        onPressed: () {
                          if (showMore == false) {
                            setState(() {
                              showMore = true;
                            });
                          } else {
                            setState(() {
                              showMore = false;
                            });
                          }
                        },
                        child: showMore == false
                            ? Text("View all passwords")
                            : Text("Hide passwords"))
                    : heightspace(0)
                : count != 0 && isDateChange
                    ? TextButton(
                        onPressed: () {
                          setState(() {
                            count = count + 3;
                            generateMore = true;
                          });
                        },
                        child: Text("Generate more"))
                    : heightspace(0),
          ]),
        ),
      ),
    );
  }

  Future pickdate() async {
    final newdate = await showDatePicker(
        context: context,
        initialDate: DateTime.parse(newInitialDate ?? _endDate),
        firstDate: DateTime.parse(_startDate),
        initialEntryMode: DatePickerEntryMode.calendar,
        lastDate: DateTime.parse(_endDate));

    if (newdate == null) return;
    print(newInitialDate);
    print(_endDate);
    if (newInitialDate != null
        ? newInitialDate == DateFormat("yyyy-MM-dd").format(newdate)
        : _endDate == DateFormat("yyyy-MM-dd").format(newdate)) {
    } else {
      setState(() {
        count = 3;
        isDateChange = true;
        showMore = false;
      });
    }
    setState(() {
      // isChanged = true;
      newInitialDate = DateFormat("yyyy-MM-dd").format(newdate);
      selectdate = DateFormat("MMM dd yyyy").format(newdate);
      print(selectdate);
      currentTimeStamp =
          DateTime.parse(newInitialDate!).millisecondsSinceEpoch ~/ 1000;
      currentTimeStamp =
          (currentTimeStamp! ~/ PasswordManager.passwordValidity) *
              PasswordManager.passwordValidity;
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
