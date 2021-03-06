import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/components/string_extension.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Passsummary extends StatefulWidget {
  // final String url;
  // final String email;

  // final String password;
  final PassModel passModel;
  const Passsummary({
    required this.passModel,
    Key? key,
  }) : super(key: key);

  @override
  _PasssummaryState createState() => _PasssummaryState();
}

class _PasssummaryState extends State<Passsummary> {
  PasswordManager _passwordManager = PasswordManager();
  List timeStamps = [];
  String? getdate;
  int? startTimeStamp;
  int? timeStamp;
  late int count;
  int? currentTimeStamp;
  @override
  void initState() {
    // TODO: implement initState
    count = PasswordManager.preferences
        .getInt('${widget.passModel.toMap(passModel: widget.passModel)}')!;
    timeStamps = _passwordManager.getLast1yrpswds(passModel: widget.passModel);
    print(timeStamps.length);
    super.initState();
  }

  getdata() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    getdate = sharedPreferences.getString("startingDate");
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
          "Password Summary",
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: timeStamps.isEmpty
              ? const Text(
                  "You haven't change your password since last year.",
                  style: TextStyle(
                      color: Colors.grey,
                      fontSize: 15,
                      fontFamily: "TitilliumWeb",
                      fontWeight: FontWeight.w400),
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
                  heightspace(15),
                  // Column(
                  //   children: const [
                  //     Text(
                  //       "Passwords :",
                  //       style: TextStyle(
                  //           color: ktextcolor,
                  //           fontSize: 16,
                  //           // fontFamily: 'TitilliumWeb',
                  //           fontWeight: FontWeight.w500),
                  //     ),
                  //   ],
                  // ),
                  // heightspace(10),
                  ListView.builder(
                      itemCount: timeStamps.length,
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, indx) {
                        return Container(
                          padding: const EdgeInsets.only(top: 30.0),
                          decoration: BoxDecoration(
                              border: Border(
                                  bottom:
                                      BorderSide(color: Colors.grey.shade400))),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                DateFormat('MMM dd,yyyy')
                                    .format(DateTime.fromMillisecondsSinceEpoch(
                                        timeStamps[indx] * 1000))
                                    .toString(),
                                style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 14,
                                    fontFamily: 'TitilliumWeb',
                                    fontWeight: FontWeight.bold),
                              ),
                              heightspace(10),
                              ListView.builder(
                                itemCount: indx == 0 ? count + 1 : 3,
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) => TextFormField(
                                    initialValue:
                                        _passwordManager.generatePassword(
                                            passModel: widget.passModel,
                                            timeStamp: timeStamps[indx],
                                            currentTimeStamp: DateTime.now()
                                                    .millisecondsSinceEpoch ~/
                                                1000,
                                            index: index),
                                    style: const TextStyle(
                                      color: Colors.black,
                                      fontSize: 14,
                                      // fontFamily: 'TitilliumWeb',
                                    ),
                                    readOnly: true,
                                    decoration: InputDecoration(
                                        focusedBorder: InputBorder.none,
                                        suffixIcon: IconButton(
                                            padding: const EdgeInsets.only(
                                                bottom: 8.0,
                                                left: 0.0,
                                                top: 0.0),
                                            onPressed: () {
                                              Clipboard.setData(ClipboardData(
                                                  text: _passwordManager
                                                      .generatePassword(
                                                          passModel:
                                                              widget.passModel,
                                                          currentTimeStamp:
                                                              DateTime.now()
                                                                      .millisecondsSinceEpoch ~/
                                                                  1000,
                                                          index: index)));
                                              final snackBar = SnackBar(
                                                content: const Text(
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
                            ],
                          ),
                        );
                      })
                ]),
        ),
      ),
    );
  }

  // void visibility() {
  //   setState(() {
  //     visibletext = !visibletext;
  //   });
  // }
}
