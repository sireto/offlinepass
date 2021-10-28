import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:offlinepass/screens/homescreen/renewpassword.dart';

import '../../constants.dart';
import '../../themes.dart';
import 'package:offlinepass/components/string_extension.dart';

class Search extends SearchDelegate {
  final List datas;
  Search({required this.datas});
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
        elevation: 0.0,
        brightness: colorScheme.brightness,
        backgroundColor: Colors.white,
        iconTheme: theme.primaryIconTheme.copyWith(color: Colors.grey),
        // textTheme: TextTheme(subhe: TextStyle(color: Colors.grey))
      ),
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
        icon: query.length != 0 ? Icon(Icons.clear) : Icon(null),
      )
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.arrow_back_ios_new_rounded),
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
    var results = [];
    if (query.isNotEmpty || query != '') {
      print(datas);
      results = datas
          .where((element) => element.url
              .substring(12, element.url!.length - 4)
              .contains(query.toLowerCase()))
          .toList();
    }
    print(results);
    return ListView.builder(
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
        padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: screenWidth * 0.6,
              child: Row(
                children: [
                  Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: icons[data.url]!['color']),
                      child: Icon(
                        icons[data.url]!['icon'],
                        color: Colors.white,
                        size: 30,
                      )),
                  widthspace(20),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          data.url!
                              .substring(12, data.url!.length - 4)
                              .toString()
                              .capitalize(),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              fontSize: 18,
                              fontFamily: 'TitilliumWeb',
                              fontWeight: FontWeight.bold),
                        ),
                        //  heightspace(5),
                        Text(
                          data.user!,
                          style: const TextStyle(
                              fontSize: 15,
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
            Row(
              children: [
                Container(
                  width: screenWidth * 0.2,
                  height: 40,
                  child: ElevatedButton(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: 'datas[i].pass'));
                      // const snackBar = SnackBar(
                      //   content: Text("Copied to Clipboard"),
                      //   duration: Duration(milliseconds: 20),
                      // );
                      // ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      Fluttertoast.showToast(
                          msg: "Copied to clipboard",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          timeInSecForIosWeb: 1,
                          backgroundColor: Colors.grey,
                          textColor: Colors.white,
                          fontSize: 16.0);
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
            ),
          ],
        ));
  }
}
