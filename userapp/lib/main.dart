import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'dart:async';
import 'dart:convert';

void main() {
  runApp(MaterialApp(home: HomePage()));
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

getUsers() {}

class _HomePageState extends State<HomePage> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User List'),
        backgroundColor: Colors.indigo[900],
      ),
      //body: ListView.builder(),
    );
  }
}
