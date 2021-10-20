import 'package:flutter/material.dart';
import 'package:offlinepass/color.dart';

class Addhost extends StatefulWidget {
  const Addhost({Key? key}) : super(key: key);

  @override
  _AddhostState createState() => _AddhostState();
}

class _AddhostState extends State<Addhost> {
  @override
  Widget build(BuildContext context) {
    var password = [
      "0\$6abJf8HpfgJfFkw7",
      "1\$y83rZjCQfb4bg87p",
    ];
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.black),
        backgroundColor: Colors.grey,
        title: const Text(
          "Add Host",
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.only(left: 20),
              child: const Text(
                "Add an App/Site",
                style: TextStyle(fontSize: 20),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(20),
              child: TextFormField(
                decoration: InputDecoration(
                    label: const Text("App/Site URL"),
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.black),
                      borderRadius: BorderRadius.circular(8),
                    )),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: TextFormField(
                decoration: InputDecoration(
                    label: const Text("Username/email or phone"),
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.black),
                      borderRadius: BorderRadius.circular(8),
                    )),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Container(
              padding: const EdgeInsets.only(left: 30, right: 30),
              width: MediaQuery.of(context).size.width,
              height: 50,
              child: ElevatedButton(
                onPressed: () {},
                child: Text(
                  "Generate Password",
                  style: TextStyle(color: textcolor, fontSize: 16),
                ),
                style: ElevatedButton.styleFrom(
                    primary: Colors.grey,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8))),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Password",
                    style: TextStyle(
                        color: textcolor,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(
                      "New",
                      style: TextStyle(color: textcolor, fontSize: 16),
                    ),
                    style: ElevatedButton.styleFrom(
                        primary: Colors.grey,
                        padding: const EdgeInsets.symmetric(horizontal: 30),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8))),
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: 2,
                  itemBuilder: (context, int index) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          password[index],
                          style: const TextStyle(fontSize: 16),
                        ),
                        ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "copy",
                            style: TextStyle(color: textcolor, fontSize: 16),
                          ),
                          style: ElevatedButton.styleFrom(
                              primary: Colors.grey,
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 30)),
                        )
                      ],
                    );
                  }),
            )
          ],
        ),
      ),
    );
  }
}
