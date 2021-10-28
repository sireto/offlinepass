import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';

ThemeData theme() => ThemeData(
      brightness: Brightness.light,
      primaryColor: Colors.blueAccent,
      appBarTheme: appBarTheme(),
      textTheme:
          TextTheme(headline6: TextStyle(fontSize: 16, color: Colors.black,fontWeight: FontWeight.w400)),
      scaffoldBackgroundColor: Colors.white,
    );

AppBarTheme appBarTheme() => const AppBarTheme(
    color: kprimarycolor,
    centerTitle: false,
    elevation: 0.0,
    titleTextStyle: TextStyle(
      color: Colors.white,
      // fontFamily: 'TitilliumWeb',
      fontSize: 17,
      fontWeight: FontWeight.w400,
    ),
    textTheme: TextTheme(
      headline6: TextStyle(
        color: Colors.white,
        fontFamily: 'TitilliumWeb',
        fontSize: 18,
        fontWeight: FontWeight.w700,
      ),
    ),
    actionsIconTheme: IconThemeData(color: Colors.white),
    iconTheme: IconThemeData(color: Colors.white));
SizedBox heightspace(double height) {
  return SizedBox(
    height: height,
  );
}

SizedBox widthspace(double width) {
  return SizedBox(
    width: width,
  );
}
