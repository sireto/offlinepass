import 'package:flutter/material.dart';

ThemeData theme() => ThemeData(
      brightness: Brightness.light,
      primaryColor: Colors.blueAccent,
      appBarTheme: appBarTheme(),
      scaffoldBackgroundColor: Colors.white,
    );

AppBarTheme appBarTheme() => AppBarTheme(
    color: Colors.blueAccent,
    centerTitle: true,
    elevation: 0.0,
    titleTextStyle: const TextStyle(
      color: Colors.white,
      fontFamily: 'TitilliumWeb',
      fontSize: 18,
      fontWeight: FontWeight.w700,
    ),
    textTheme: const TextTheme(
      headline6: TextStyle(
        color: Colors.white,
        fontFamily: 'TitilliumWeb',
        fontSize: 18,
        fontWeight: FontWeight.w700,
      ),
    ),
    iconTheme: IconThemeData(color: Colors.grey[600]));
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
