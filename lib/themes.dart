import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';

ThemeData theme() => ThemeData(
      brightness: Brightness.light,
      primaryColor: Colors.blueAccent,
      appBarTheme: appBarTheme(),
      scaffoldBackgroundColor: Colors.white,
    );

AppBarTheme appBarTheme() => AppBarTheme(
    color: kprimarycolor,
    centerTitle: true,
    elevation: 0.0,
  
    titleTextStyle: const TextStyle(
      color: Colors.white,
      fontFamily: 'TitilliumWeb',
      fontSize: 16,
      fontWeight: FontWeight.w600,
    ),
    textTheme: const TextTheme(
      headline6: TextStyle(
        color: Colors.white,
        fontFamily: 'TitilliumWeb',
        fontSize: 18,
        fontWeight: FontWeight.w700,
      ),
    ),
    actionsIconTheme:IconThemeData(color: Colors.white) ,
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
