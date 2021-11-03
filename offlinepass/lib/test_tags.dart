import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:offlinepass/constants.dart';
import 'package:textfield_tags/textfield_tags.dart';

class TestTags extends StatefulWidget {
  const TestTags({Key? key}) : super(key: key);

  @override
  _TestTagsState createState() => _TestTagsState();
}

class _TestTagsState extends State<TestTags> {
  TextEditingController appSiteUrl = TextEditingController();
  List<String> url = [
    "Facebook.com",
    "Gmail.com",
    "Yahoo.com",
    "Reddit.com",
    "Twitch.com",
    "Twitter.com",
    "Telegram.com",
    "Linkedin.com"
  ];
  FocusNode _urlFocusNode = FocusNode();
  String searchText = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Container(
        child: TypeAheadFormField<String>(
            // key: _urlkey,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return knullUrl;
              }
              return null;
            },
            suggestionsCallback: (pattern) {
              print(appSiteUrl.selection);
              print("searchRext: $searchText");
              print("pattern: $pattern");
              String toSearch = pattern.replaceAll(searchText, "");
              toSearch = toSearch.replaceAll(" ", "");
              print("toSearch: $toSearch");
              return url
                  .where(
                      (e) => e.toLowerCase().contains(toSearch.toLowerCase()))
                  .toList();
            },
            transitionBuilder: (context, suggestionsBox, controller) {
              return suggestionsBox;
            },
            hideSuggestionsOnKeyboardHide: true,
            textFieldConfiguration: TextFieldConfiguration(
                controller: appSiteUrl,
                focusNode: _urlFocusNode,
                cursorColor: kprimarycolor,
                onEditingComplete: () {
                  print("editing complete");
                  searchText = searchText + " " + appSiteUrl.text;
                  print("searchRext: $searchText");
                  setState(() {
                    appSiteUrl.text = searchText;
                    _urlFocusNode.unfocus();
                  });
                },
                onSubmitted: (value) {
                  print("submitter");
                  searchText = searchText + " " + value;
                  print("searchRext: $searchText");
                  setState(() {
                    appSiteUrl.text = searchText;
                  });
                },
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black87,
                  // fontFamily: 'TitilliumWeb'
                ),
                scrollPadding: const EdgeInsets.only(bottom: 250),
                decoration: InputDecoration(
                  labelText: "App/Site URL",
                  focusedBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: kprimarycolor),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  labelStyle: const TextStyle(
                      fontSize: 16,
                      color: Colors.grey,
                      fontFamily: 'TitilliumWeb'),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  suffixIcon: Icon(
                    Icons.arrow_drop_down_outlined,
                    size: 30,
                    color: url.contains(appSiteUrl.text)
                        ? Colors.grey
                        : Colors.white,
                  ),
                )),
            itemBuilder: (context, suggestion) {
              //  print(suggestion!.statename);
              return ListTile(
                title: Text(suggestion.toString()),
              );
            },
            noItemsFoundBuilder: (context) => Container(
                  height: 50,
                  child: const Center(
                    child: Text(
                      "Not listed",
                      style: TextStyle(fontSize: 15),
                    ),
                  ),
                ),
            onSuggestionSelected: (suggestion) {
              searchText = searchText + " " + suggestion;
              print("searchRext: $searchText");
              setState(() {
                appSiteUrl.text = searchText;
              });
            }),
      )),
    );
  }
}
