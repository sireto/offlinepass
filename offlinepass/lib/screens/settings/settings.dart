import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:local_auth/local_auth.dart';
import 'package:offlinepass/components/local_auth_api.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:offlinepass/main.dart';
import 'package:offlinepass/screens/lockscreen.dart';
import 'package:offlinepass/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:toggle_switch/toggle_switch.dart';

class Unlocksettings extends StatefulWidget {
  const Unlocksettings({Key? key}) : super(key: key);

  @override
  State<Unlocksettings> createState() => _UnlocksettingsState();
}

class _UnlocksettingsState extends State<Unlocksettings> {
  int initialindex = 0;
  int fingerprintinitialindex = 0;
  final LocalAuthentication auth = LocalAuthentication();
  _SupportState _supportState = _SupportState.unknown;
  List<int> days = [90, 60, 30];
  int currentday = 90;
  static const _url = 'https://github.com/sireto/offlinepass';
  @override
  void initState() {
    // TODO: implement initState
    getstring();
    pincodes != null ? initialindex = 1 : 0;
    fingerprints == true ? fingerprintinitialindex = 1 : 0;
    auth.isDeviceSupported().then((isSupported) => setState(() =>
        _supportState =
            isSupported ? _SupportState.supported : _SupportState.unsupported));
    super.initState();
  }

  getstring() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    pincodes = sharedPreferences.getString("pincode");
    fingerprints = sharedPreferences.getBool("fingerprints");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          "Settings",
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              heightspace(20),
              Container(
                height: 150,
                width: 150,
                decoration: const BoxDecoration(shape: BoxShape.circle),
                child: const Image(
                  image: AssetImage("asset/logo.png"),
                ),
              ),
              heightspace(20),
              const Text(
                "Offline Password",
                style: TextStyle(
                    fontSize: 20,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.w500),
              ),
              heightspace(5),
              const Text(
                "Version 1.0",
                style: TextStyle(fontFamily: 'TitilliumWeb', fontSize: 14),
              ),
              heightspace(20),
              Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.lock_rounded,
                              color: Colors.black87,
                            ),
                            widthspace(20),
                            const Text(
                              "Pin code",
                              style: TextStyle(
                                  fontSize: 18, fontFamily: 'TitilliumWeb'),
                            )
                          ],
                        ),
                        ToggleSwitch(
                          minWidth: 50.0,
                          // minHeight: 35.0,
                          cornerRadius: 20.0,
                          activeBgColors: [
                            [Colors.red.shade800],
                            [Colors.green[800]!]
                          ],
                          activeFgColor: Colors.white,
                          inactiveBgColor: Colors.grey,
                          inactiveFgColor: Colors.white,
                          initialLabelIndex: initialindex,
                          totalSwitches: 2,
                          labels: ['Off', 'On'],
                          radiusStyle: true,
                          onToggle: (index) async {
                            SharedPreferences sharedPreferences =
                                await SharedPreferences.getInstance();
                            print('switched to: $index');
                            if (index == 1 && initialindex == 0) {
                              setState(() {
                                initialindex = 0;
                              });

                              Future value = Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const Lockscreen(
                                            from: "putpincode",
                                          )));
                              value.then((value) {
                                sharedPreferences.setString("pincode", value);
                                if (value != null) {
                                  setState(() {
                                    initialindex = 1;
                                  });
                                  const snackBar = SnackBar(
                                    content: Text("Pincode set successfully"),
                                    duration: Duration(milliseconds: 500),
                                  );
                                  ScaffoldMessenger.of(context)
                                      .showSnackBar(snackBar);
                                }
                              });
                            } else if (index == 0 && initialindex == 1) {
                              print("i am click");
                              Future value = Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const Lockscreen(from: "confirm")));
                              value.then((value) {
                                if (value != null) {
                                  setState(() {
                                    initialindex = 0;
                                  });
                                  sharedPreferences.remove("pincode");
                                  const snackBar = SnackBar(
                                    content: Text("Pincode removed"),
                                    duration: Duration(milliseconds: 500),
                                  );
                                  ScaffoldMessenger.of(context)
                                      .showSnackBar(snackBar);
                                } else {
                                  setState(() {
                                    initialindex = 1;
                                  });
                                }
                              });
                            }
                          },
                        ),
                      ],
                    ),
                    heightspace(5),
                    _supportState == _SupportState.supported
                        ? const Divider(
                            height: 2,
                            color: Colors.black,
                          )
                        : const SizedBox(),
                    _supportState == _SupportState.supported
                        ? heightspace(15)
                        : heightspace(0),
                    _supportState == _SupportState.supported
                        ? Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  const Icon(
                                    Icons.fingerprint_rounded,
                                    color: Colors.black87,
                                  ),
                                  widthspace(20),
                                  const Text(
                                    "Fingerprint Lock",
                                    style: TextStyle(
                                        fontSize: 18,
                                        fontFamily: 'TitilliumWeb'),
                                  )
                                ],
                              ),
                              ToggleSwitch(
                                minWidth: 50.0,
                                cornerRadius: 20.0,
                                activeBgColors: [
                                  [Colors.red.shade800],
                                  [Colors.green[800]!]
                                ],
                                activeFgColor: Colors.white,
                                inactiveBgColor: Colors.grey,
                                inactiveFgColor: Colors.white,
                                initialLabelIndex: fingerprintinitialindex,
                                totalSwitches: 2,
                                labels: ['Off', 'On'],
                                radiusStyle: true,
                                onToggle: (index) async {
                                  SharedPreferences sharedPreferences =
                                      await SharedPreferences.getInstance();
                                  print('switched to: $index');
                                  if (index == 0 &&
                                      fingerprintinitialindex == 1) {
                                    final isauthenticate =
                                        await LocalAuthApi.authenticate();
                                    if (isauthenticate) {
                                      setState(() {
                                        fingerprintinitialindex = 0;
                                      });
                                      sharedPreferences.remove("fingerprints");
                                    } else {
                                      setState(() {
                                        fingerprintinitialindex = 1;
                                      });
                                    }
                                    // setState(() {
                                    //   fingerprintinitialindex = 0;
                                    // });

                                  } else if (index == 1 &&
                                      initialindex == 0 &&
                                      fingerprintinitialindex == 0) {
                                    const snackbar = SnackBar(
                                      content: Text("Please set pincode first"),
                                      duration: Duration(milliseconds: 500),
                                    );
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(snackbar);
                                    setState(() {
                                      fingerprintinitialindex = 0;
                                    });
                                  } else if (index == 1 && initialindex == 1) {
                                    final isauthenticate =
                                        await LocalAuthApi.authenticate();
                                    if (isauthenticate) {
                                      sharedPreferences.setBool(
                                          "fingerprints", true);
                                      const snackbar = SnackBar(
                                        content: Text("Fingerprint lock added"),
                                        duration: Duration(milliseconds: 500),
                                      );
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(snackbar);
                                      setState(() {
                                        fingerprintinitialindex = 1;
                                      });
                                    } else {
                                      setState(() {
                                        fingerprintinitialindex = 0;
                                      });
                                    }
                                  }
                                },
                              ),
                            ],
                          )
                        : heightspace(0),
                    _supportState == _SupportState.supported
                        ? heightspace(15)
                        : heightspace(0),
                    const Divider(
                      height: 2,
                      color: Colors.black,
                    ),
                    heightspace(15),
                    // Row(
                    //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    //   children: [
                    //     Row(
                    //       children: [
                    //         const Icon(Icons.notifications_active),
                    //         widthspace(20),
                    //         const Text("Remainder",
                    //             style: TextStyle(
                    //                 fontSize: 18, fontFamily: 'TitilliumWeb')),
                    //       ],
                    //     ),
                    //     DropdownButton<int>(
                    //       underline: const SizedBox(),
                    //       value: currentday,
                    //       //  dropdownColor: color1,
                    //       // iconEnabledColor: text1,
                    //       onChanged: (int? newvalue) {
                    //         setState(() {
                    //           currentday = newvalue!;
                    //         });
                    //         print(newvalue);
                    //       },
                    //       style: const TextStyle(
                    //           fontSize: 13, fontFamily: "TitilliumWeb"),
                    //       items: days
                    //           .map<DropdownMenuItem<int>>(
                    //               (int value) => DropdownMenuItem<int>(
                    //                     value: value,
                    //                     child: Text(
                    //                       "$value days",
                    //                       style: const TextStyle(
                    //                           fontFamily: "TitilliumWeb",
                    //                           fontSize: 15,
                    //                           color: Colors.black),
                    //                     ),
                    //                   ))
                    //           .toList(),
                    //     ),
                    //   ],
                    // ),
                    // heightspace(10),
                    // const Divider(
                    //   height: 2,
                    //   color: Colors.black,
                    // ),
                    //  heightspace(20),
                    InkWell(
                      onTap: _launchURL,
                      child: Row(
                        children: [
                          const Icon(FontAwesomeIcons.github),
                          widthspace(20),
                          Expanded(
                            child: const Text(_url,
                                style: TextStyle(
                                    fontSize: 18, fontFamily: 'TitilliumWeb')),
                          ),
                        ],
                      ),
                    ),
                    heightspace(20),
                    const Divider(
                      height: 2,
                      color: Colors.black,
                    ),
                    heightspace(20),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  void _launchURL() async => await launch(_url);
  // : throw 'Could not launch $_url';
}

enum _SupportState {
  unknown,
  supported,
  unsupported,
}
