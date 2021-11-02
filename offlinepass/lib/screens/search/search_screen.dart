import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';

import '../../constants.dart';
import '../../themes.dart';
import 'package:offlinepass/components/string_extension.dart';

class Search extends SearchDelegate {
  final List datas;
  final BuildContext context;
  Search({required this.datas, required this.context}) {
    print(datas);
  }
  @override
  TextStyle get searchFieldStyle => TextStyle(
      fontSize: 16, color: Colors.black38, fontWeight: FontWeight.w300);

  @override
  String get searchFieldLabel => "Search Here";
  @override
  ThemeData appBarTheme(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final ColorScheme colorScheme = theme.colorScheme;

    return theme.copyWith(
      appBarTheme: AppBarTheme(
          titleTextStyle: TextStyle(
            color: Colors.black,
            // fontFamily: 'TitilliumWeb',
            fontSize: 14,
          ),
          elevation: 0.0,
          brightness: colorScheme.brightness,
          backgroundColor: Colors.white,
          iconTheme: theme.primaryIconTheme.copyWith(color: Colors.grey),
          toolbarTextStyle: TextStyle(color: Colors.blue)),
      inputDecorationTheme: searchFieldDecorationTheme ??
          InputDecorationTheme(
            hintStyle: searchFieldStyle,
            border: InputBorder.none,
          ),
    );
  }

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () {
          query = '';
        },
        icon: query.length != 0 ? Icon(Icons.clear, size: 22) : Icon(null),
      )
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(
        Icons.arrow_back_ios_new_rounded,
        size: 22,
      ),
      onPressed: () {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    // TODO: implement buildResults
    throw UnimplementedError();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    print(datas);
    List results = datas;
    if (query.isNotEmpty || query != '') {
      print(datas);
      results = datas.where((element) {
        if (element.url.contains('.com')) {
          return element.url
              .toString()
              .toLowerCase()
              .substring(0, element.url!.length - 4)
              .contains(query.toLowerCase());
        } else {
          return element.url
              .toString()
              .toLowerCase()
              .contains(query.toLowerCase());
        }
      }).toList();
    }
    print(results.length);
    return ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15.0),
        itemCount: results.length,
        itemBuilder: (context, index) => InkWell(
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => RenewPassword(
                            passModel: results[index],
                            // url: datas[index]["url"],
                            // email: datas[index]["email"],
                            // password: datas[index]
                            // ["password"]
                          )));
            },
            child: emailUserView(results[index])));
  }

  Container emailUserView(var data) {
    return Container(
        width: screenWidth,
        padding: const EdgeInsets.only(top: 5.0, bottom: 10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              // width: screenWidth * 0.6,
              child: Row(
                children: [
                  Container(
                      height: 45,
                      width: 45,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: data.colorIndex != null
                              ? colors[data.colorIndex]
                              : icons[data.url]!['color']),
                      child: data.colorIndex != null
                          ? Center(
                              child: Text(
                                data.url.substring(0, 2).toUpperCase(),
                                style: TextStyle(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 18,
                                    color: Colors.white),
                              ),
                            )
                          : Icon(
                              icons[data.url]!['icon'],
                              color: Colors.white,
                              size: 26,
                            )),
                  widthspace(20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          data.url!.contains('.com')
                              ? data.url!
                                  .substring(0, data.url!.length - 4)
                                  .toString()
                                  .capitalize()
                              : data.url!.toString().capitalize(),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 16,
                            // fontFamily: 'TitilliumWeb',
                            // fontWeight: FontWeight.bold
                          ),
                        ),
                        //  heightspace(5),
                        Text(
                          data.user!,
                          overflow: TextOverflow.ellipsis,
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
            // IconButton(
            //     onPressed: () {
            //       Clipboard.setData(ClipboardData(text: 'datas[i].pass'));
            //       const snackBar = SnackBar(
            //         content: Text("Copied to Clipboard"),
            //         duration: Duration(milliseconds: 20),
            //       );
            //       ScaffoldMessenger.of(context).showSnackBar(snackBar);
            //     },
            //     icon: Icon(Icons.copy)),
            IconButton(
                padding: EdgeInsets.only(bottom: 8.0, left: 0.0),
                onPressed: () {
                  Clipboard.setData(ClipboardData(
                      text: PasswordManager().generatePassword(
                          passModel: data,
                          currentTimeStamp:
                              DateTime.now().millisecondsSinceEpoch ~/ 1000)));
                  final snackBar = SnackBar(
                    content: Text("Copied to Clipboard"),
                    backgroundColor: Colors.grey.shade600,
                  );
                  ScaffoldMessenger.of(context).showSnackBar(snackBar);
                },
                icon: const Icon(
                  Icons.copy_rounded,
                  color: Colors.grey,
                )),
          ],
        ));
  }
}
