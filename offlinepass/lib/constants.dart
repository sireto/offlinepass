// ignore_for_file: unnecessary_string_escapes

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

const Color ktextcolor = Colors.black;
const Color kprimarycolor = Colors.blueAccent;
const String knullUrl = "please enter the url";
const String kvalidurl = "please enter valid url";
const String knullEmail = "please enter email/username/phone";
RegExp kusernamevalidator = RegExp(
    r"^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]");
RegExp kphonenumbervalidator =
    RegExp(r"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*");
RegExp kemailvalidator = RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
var screenWidth;
var screenHeight;
Map<String, Map> icons = {
  "https://www.facebook.com": {
    'icon': FontAwesomeIcons.facebook,
    'color': const Color(0xff3b5998)
  },
  "https://www.gmail.com": {
    'icon': FontAwesomeIcons.google,
    'color': Colors.red
  },
  "https://www.yahoo.com": {
    'icon': FontAwesomeIcons.yahoo,
    'color': const Color(0xff720e9e)
  },
  "https://www.reddit.com": {
    'icon': FontAwesomeIcons.reddit,
    'color': const Color(0xffff4500)
  },
  "https://www.twitch.com": {
    'icon': FontAwesomeIcons.twitch,
    'color': const Color(0xff6441a5)
  },
  "https://www.twitter.com": {
    'icon': FontAwesomeIcons.twitter,
    'color': const Color(0xff00acee)
  },
  "https://www.telegram.com": {
    'icon': FontAwesomeIcons.telegram,
    'color': const Color(0xff0088cc)
  },
  "https://www.linkedin.com": {
    'icon': FontAwesomeIcons.linkedin,
    'color': const Color(0xff0077b5)
  },
};
