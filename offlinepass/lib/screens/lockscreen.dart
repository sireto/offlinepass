import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:local_auth/local_auth.dart';
import 'package:offlinepass/components/local_auth_api.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/firstscreen.dart';
import 'package:offlinepass/main.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/homescreen/homescreen.dart';
import 'package:offlinepass/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Lockscreen extends StatefulWidget {
  final String from;
  const Lockscreen({Key? key, required this.from}) : super(key: key);

  @override
  _LockscreenState createState() => _LockscreenState();
}

class _LockscreenState extends State<Lockscreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final FocusNode _focusNode2 = FocusNode();
  final FocusNode _focusNode3 = FocusNode();
  final FocusNode _focusNode4 = FocusNode();
  final FocusNode _focusNode5 = FocusNode();
  final FocusNode _focusNode6 = FocusNode();
  TextStyle? _otpTextStyle;
  InputDecoration? _otpInputDecoration;
  late FocusNode pin1FocusNode;
  late FocusNode pin2FocusNode;
  late FocusNode pin3FocusNode;
  late FocusNode pin4FocusNode;
  late FocusNode pin5FocusNode;
  late FocusNode pin6FocusNode;

  TextEditingController pin1 = TextEditingController();
  TextEditingController pin2 = TextEditingController();
  TextEditingController pin3 = TextEditingController();
  TextEditingController pin4 = TextEditingController();
  TextEditingController pin5 = TextEditingController();
  TextEditingController pin6 = TextEditingController();
  final LocalAuthentication auth = LocalAuthentication();
  _SupportState _supportState = _SupportState.unknown;
  String? fPincode;

  @override
  void initState() {
    _otpTextStyle = const TextStyle(
      fontSize: 18,
      color: Colors.white38,
    );
    _otpInputDecoration = InputDecoration(
        contentPadding: const EdgeInsets.symmetric(vertical: 4.0),
        counterText: '',
        focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.white, width: 1.5)),
        enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.white, width: 1.5)));
    pin1FocusNode = FocusNode();
    pin2FocusNode = FocusNode();
    pin3FocusNode = FocusNode();
    pin4FocusNode = FocusNode();
    pin5FocusNode = FocusNode();
    pin6FocusNode = FocusNode();
    pin1FocusNode.requestFocus();
    auth.isDeviceSupported().then(
          (isSupported) => setState(() => _supportState = isSupported
              ? _SupportState.supported
              : _SupportState.unsupported),
        );
    //LocalAuthApi.authenticate();
    getstring();
    super.initState();
  }

  getstring() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    pincodes = sharedPreferences.getString("pincode");
    fingerprints = sharedPreferences.getBool("fingerprints");
  }

  Future biometric() async {
    final isauthenticate = await LocalAuthApi.authenticate();
    if (isauthenticate) {
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const Firstscreen()),
          (route) => false);
    }
  }

  @override
  void dispose() {
    pin2FocusNode.dispose();
    pin3FocusNode.dispose();
    pin4FocusNode.dispose();
    pin5FocusNode.dispose();
    pin6FocusNode.dispose();
    _focusNode2.dispose();
    _focusNode3.dispose();
    _focusNode4.dispose();
    _focusNode5.dispose();
    _focusNode6.dispose();
    super.dispose();
  }

  void nextField(String value, FocusNode focusNode) {
    if (value.length == 1) {
      focusNode.requestFocus();
    }
  }

  void deleteField(String value, FocusNode focusNode) {
    if (value.isEmpty) {
      focusNode.requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kprimarycolor,
      body: SafeArea(
        child: Stack(
          children: [
            (_supportState == _SupportState.supported &&
                    fingerprints == true &&
                    widget.from == "main")
                ? Positioned(
                    top: 5,
                    right: 5,
                    child: IconButton(
                        onPressed: biometric,
                        icon: const Icon(
                          FontAwesomeIcons.fingerprint,
                          size: 30,
                          color: Colors.white,
                        )))
                : const SizedBox(),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.only(left: 10, right: 10, bottom: 15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    children: [
                      Container(
                        height: 150,
                        width: 150,
                        child: const Image(image: AssetImage("asset/logo.png")),
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white)),
                      ),
                      heightspace(20),
                      (pincodes != null)
                          ? Text(
                              widget.from == "main"
                                  ? "Please Enter a Pincode"
                                  : widget.from == "confirm"
                                      ? "Please Enter a Pincode"
                                      : "Set a New Pincode",
                              style: const TextStyle(
                                  fontSize: 20,
                                  color: Colors.white,
                                  fontFamily: 'TitilliumWeb'),
                            )
                          : Text(
                              fPincode == null
                                  ? "Set a New Pincode"
                                  : "Re-Enter your password",
                              style: const TextStyle(
                                  fontSize: 20, color: Colors.white),
                            )
                    ],
                  ),
                  heightspace(30),

                  // SizedBox(height: 8),
                  // Text(
                  //   "Verify your email",
                  //   style: TextStyle(
                  //       fontFamily: "OpenSans",
                  //       color: Colors.black,
                  //       fontWeight: FontWeight.w700,
                  //       fontSize: 20,
                  //       letterSpacing: 1.5),
                  // ),

                  buildOtp(),
                  // heightspace(20),
                  // buildButton(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Form buildOtp() {
    return Form(
      key: _formKey,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          SizedBox(
            width: 50,
            height: 50,
            child: TextFormField(
              focusNode: pin1FocusNode,

              // obscureText: true,
              controller: pin1,
              keyboardType: TextInputType.number,
              style: _otpTextStyle,
              maxLength: 1,
              textAlign: TextAlign.center,
              cursorColor: Colors.white38,
              decoration: _otpInputDecoration,

              onChanged: (value) {
                print(value);
                // pin1 = value;
                nextField(value, pin2FocusNode);
              },
            ),
          ),
          RawKeyboardListener(
            onKey: (event) {
              if (event.logicalKey == LogicalKeyboardKey.backspace) {
                // here you can check if textfield is focused
                if (pin2.text.isEmpty) {
                  deleteField('', pin1FocusNode);
                }
              }
            },
            focusNode: _focusNode2,
            child: SizedBox(
              width: 50,
              height: 50,
              child: TextFormField(
                focusNode: pin2FocusNode,
                controller: pin2,
                //obscureText: true,
                keyboardType: TextInputType.number,
                style: _otpTextStyle,
                textAlign: TextAlign.center,
                cursorColor: Colors.white38,
                decoration: _otpInputDecoration,
                maxLength: 1,
                onChanged: (value) {
                  //   pin2 = value;

                  if (value.isNotEmpty) {
                    print(value);
                    nextField(value, pin3FocusNode);
                  } else {
                    deleteField(value, pin1FocusNode);
                  }
                },
              ),
            ),
          ),
          RawKeyboardListener(
            onKey: (event) {
              if (event.logicalKey == LogicalKeyboardKey.backspace) {
                // here you can check if textfield is focused
                if (pin3.text.isEmpty) {
                  deleteField('', pin2FocusNode);
                }
              }
            },
            focusNode: _focusNode3,
            child: SizedBox(
              width: 50,
              height: 50,
              child: TextFormField(
                focusNode: pin3FocusNode,
                maxLength: 1,
                controller: pin3,
                //obscureText: true,
                keyboardType: TextInputType.number,
                style: _otpTextStyle,
                textAlign: TextAlign.center,
                cursorColor: Colors.white38,
                decoration: _otpInputDecoration,
                onChanged: (value) {
                  // pin3 = value;
                  print("pin3");
                  if (value.isNotEmpty) {
                    nextField(value, pin4FocusNode);
                  } else {
                    deleteField(value, pin2FocusNode);
                  }
                },
              ),
            ),
          ),
          RawKeyboardListener(
            onKey: (event) {
              if (event.logicalKey == LogicalKeyboardKey.backspace) {
                // here you can check if textfield is focused
                if (pin4.text.isEmpty) {
                  deleteField('', pin3FocusNode);
                }
              }
            },
            focusNode: _focusNode4,
            child: SizedBox(
              width: 50,
              height: 50,
              child: TextFormField(
                focusNode: pin4FocusNode,

                /// obscureText: true,
                keyboardType: TextInputType.number,
                style: _otpTextStyle,
                textAlign: TextAlign.center,
                cursorColor: Colors.white38,
                controller: pin4,
                maxLength: 1,
                decoration: _otpInputDecoration,
                onChanged: (value) {
                  //pin4 = value;

                  if (value.isNotEmpty) {
                    nextField(value, pin5FocusNode);
                  } else {
                    deleteField(value, pin3FocusNode);
                  }
                },
              ),
            ),
          ),
          RawKeyboardListener(
            onKey: (event) {
              if (event.logicalKey == LogicalKeyboardKey.backspace) {
                // here you can check if textfield is focused
                if (pin5.text.isEmpty) {
                  deleteField('', pin4FocusNode);
                }
              }
            },
            focusNode: _focusNode5,
            child: SizedBox(
              width: 50,
              height: 50,
              child: TextFormField(
                focusNode: pin5FocusNode,
                controller: pin5,
                // obscureText: true,
                keyboardType: TextInputType.number,
                style: _otpTextStyle,
                textAlign: TextAlign.center,
                cursorColor: Colors.white38,
                maxLength: 1,
                decoration: _otpInputDecoration,
                onChanged: (value) {
                  //  pin5 = value;

                  if (value.isNotEmpty) {
                    nextField(value, pin6FocusNode);
                  } else {
                    deleteField(value, pin4FocusNode);
                  }
                },
              ),
            ),
          ),
          RawKeyboardListener(
            onKey: (event) {
              print(event.logicalKey);
              print(event.data.logicalKey);
              if (event.logicalKey == LogicalKeyboardKey.backspace) {
                // here you can check if textfield is focused
                if (pin6.text.isEmpty) {
                  deleteField('', pin5FocusNode);
                }
              }
            },
            focusNode: _focusNode6,
            child: SizedBox(
              width: 50,
              height: 50,
              child: TextFormField(
                focusNode: pin6FocusNode,
                controller: pin6,

                //obscureText: true,
                keyboardType: TextInputType.number,
                style: _otpTextStyle,
                maxLength: 1,

                textAlign: TextAlign.center,
                cursorColor: Colors.white38,
                decoration: _otpInputDecoration,
                onChanged: (value) {
                  // pin6 = value;
                  if (value.isEmpty) {
                    deleteField(value, pin5FocusNode);
                  } else {
                    print(pin1.text +
                        pin2.text +
                        pin3.text +
                        pin4.text +
                        pin5.text +
                        pin6.text);
                    if (widget.from == "main") {
                      if (pincodes ==
                          (pin1.text +
                              pin2.text +
                              pin3.text +
                              pin4.text +
                              pin5.text +
                              pin6.text)) {
                        Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                                builder: (context) => PasswordManager.msk != ''
                                    ? HomeScreen()
                                    : Firstscreen()),
                            (route) => false);
                      } else {
                        setState(() {
                          pin1.clear();
                          pin2.clear();
                          pin3.clear();
                          pin4.clear();
                          pin5.clear();
                          pin6.clear();
                          pin1FocusNode.requestFocus();
                        });
                        const snackBar = SnackBar(
                          content: Text("Incorrect password"),
                          duration: Duration(milliseconds: 500),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      }

                      // pin6FocusNode.unfocus();
                    } else if (widget.from == "confirm") {
                      if (pincodes ==
                          (pin1.text +
                              pin2.text +
                              pin3.text +
                              pin4.text +
                              pin5.text +
                              pin6.text)) {
                        Navigator.pop(context, pincodes);
                      } else {
                        setState(() {
                          pin1.clear();
                          pin2.clear();
                          pin3.clear();
                          pin4.clear();
                          pin5.clear();
                          pin6.clear();
                          pin1FocusNode.requestFocus();
                        });
                        const snackBar = SnackBar(
                          content: Text("Password not match"),
                          duration: Duration(milliseconds: 500),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      }
                    } else {
                      if (fPincode != null) {
                        if (fPincode ==
                            pin1.text +
                                pin2.text +
                                pin3.text +
                                pin4.text +
                                pin5.text +
                                pin6.text) {
                          pincodes = (pin1.text +
                              pin2.text +
                              pin3.text +
                              pin4.text +
                              pin5.text +
                              pin6.text);
                          Navigator.pop(context, pincodes);
                        } else {
                          setState(() {
                            pin1.clear();
                            pin2.clear();
                            pin3.clear();
                            pin4.clear();
                            pin5.clear();
                            pin6.clear();
                            pin1FocusNode.requestFocus();
                          });
                          const snackBar = SnackBar(
                            content: Text("Password not match"),
                            duration: Duration(milliseconds: 500),
                          );
                          ScaffoldMessenger.of(context).showSnackBar(snackBar);
                        }
                      } else {
                        setState(() {
                          fPincode = pin1.text +
                              pin2.text +
                              pin3.text +
                              pin4.text +
                              pin5.text +
                              pin6.text;
                          setState(() {
                            pin1.clear();
                            pin2.clear();
                            pin3.clear();
                            pin4.clear();
                            pin5.clear();
                            pin6.clear();
                            pin1FocusNode.requestFocus();
                          });
                        });
                      }
                    }
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

enum _SupportState {
  unknown,
  supported,
  unsupported,
}
