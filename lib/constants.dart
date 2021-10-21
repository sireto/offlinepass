// ignore_for_file: unnecessary_string_escapes

import 'package:flutter/material.dart';

const Color ktextcolor = Colors.black;
const Color kprimarycolor = Colors.blueAccent;
const String knullUrl = "please enter the url";
const String kvalidurl = "please enter valid url";
const String knullEmail = "please enter email/username/phone";
const String kusernamevalidator =
    "^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]";
const String kphonenumbervalidator =
    "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*";
const String kemailvalidator =
    "^[a-zA-Z0-9.!#\$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*";
const kurlvalidatior = "^http[s]?:\/\/(www\.)?(.*)?\/?(.)*";
var screenWidth;
var screenHeight;
