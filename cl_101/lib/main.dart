import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/services.dart';


void main() {
  runApp(CleaningMoscowApp());
}


class CleaningMoscowApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'Montserrat',
        appBarTheme: AppBarTheme(
          backgroundColor: Color(0xFF639019),
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontFamily: 'Montserrat',
          ),
        ),
      ),
      home: HomeScreen(),
    );
  }
}




class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Container(
            height: MediaQuery.of(context).size.height * 0.15,
            color: Color(0xFF639019),
            child: Padding(
              padding: EdgeInsets.only(top: MediaQuery.of(context).size.height * 0.05),
              child: Center(
                child: Text(
                  'Cleaning Moscow',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Image.asset('assets/images/logo.jpg', height: 120),
                ),
                SizedBox(height: 30),
                MaterialButton(
                  color: Color(0xFF639019),
                  minWidth: 250.0,
                  height: 60.0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                  child: Text(
                    'Вход',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                  onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => LoginScreen())),
                ),
                SizedBox(height: 15),
                MaterialButton(
                  color: Color(0xFF639019),
                  minWidth: 250.0,
                  height: 60.0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                  child: Text(
                    'Регистрация',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                  onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => RegistrationScreen())),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}


class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}


class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  


  void _login(BuildContext context) async {
    final String email = _emailController.text.trim();
    // Здесь должен быть ваш код для проверки e-mail через ваш Google Apps Script
    final uri = Uri.parse('https://script.google.com/macros/s/AKfycbzfXVDg9RTBlB0lbvPbdV6_DiOnOXqN4Rm8TTTuH0E2mG_Ip7d7bnyJkgnAc7iKm7My/exec?email=$email');
    try {
      final response = await http.get(uri);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data.isNotEmpty) {
          Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => SpecialObjectsScreen(email: email)));
        } else {
          // Обработка случая, когда e-mail не найден
          _showErrorDialog('E-mail не найден.');
        }
      } else {
        // Обработка ошибки сервера
        _showErrorDialog('Ошибка сервера.');
      }
    } catch (e) {
      // Обработка ошибки запроса
      _showErrorDialog('Ошибка запроса.');
    }
  }


  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Ошибка'),
        content: Text(message),
        actions: <Widget>[
          TextButton(
            child: Text('ОК'),
            onPressed: () => Navigator.of(ctx).pop(),
          ),
        ],
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Вход'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 8),
                child: TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'E-mail : Пароль',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(5.0)),
                  ),
                ),
              ),

              SizedBox(height: 20),
              MaterialButton(
                color: Color(0xFF639019),
                minWidth: 250.0,
                height: 60.0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                child: Text('Вход', style: TextStyle(color: Colors.white, fontSize: 20)),
                onPressed: () => _login(context),
              ),
              SizedBox(height: 15),
              MaterialButton(
                color: Color(0xFF639019),
                minWidth: 250.0,
                height: 60.0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                child: Text('Назад', style: TextStyle(color: Colors.white, fontSize: 20)),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class RegistrationScreen extends StatelessWidget {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();


  Future<void> _register(BuildContext context) async {
    final response = await http.post(
      Uri.parse('https://script.google.com/macros/s/AKfycbzHPr_Q3_NSqKCT7zbhA-BJBz13Cp-LoL4KEMv2LBWxaBA6a5GZtwCE__zsKxjaBdwAVQ/exec'),
      headers: {"Content-Type": "application/json"},
      body: json.encode({
        "name": _nameController.text,
        "email": _emailController.text,
      }),
    );


    if (response.statusCode == 200) {
      // Успешная отправка данных
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Успешно"),
            content: Text("Регистрация успешно завершена."),
            actions: [
              TextButton(
                child: Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop(); // Закрывает диалоговое окно
                },
              ),
            ],
          );
        },
      );
    } else {
      // Ошибка при отправке данных
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Спасибо за регистрацию!"),
            content: Text("Вы успешно зарегистрировались!"),
            actions: [
              TextButton(
                child: Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop(); // Закрывает диалоговое окно
                },
              ),
            ],
          );
        },
      );
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Регистрация'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 8),
                child: TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    labelText: 'Имя',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(5.0)),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 8),
                child: TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'E-mail',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(5.0)),
                  ),
                ),
              ),
              SizedBox(height: 20),
              MaterialButton(
                color: Color(0xFF639019),
                minWidth: 250.0,
                height: 60.0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                child: Text('Зарегистрироваться', style: TextStyle(color: Colors.white, fontSize: 20)),
                onPressed: () => _register(context),
              ),
              SizedBox(height: 15),
              MaterialButton(
                color: Color(0xFF639019),
                minWidth: 250.0,
                height: 60.0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
                child: Text('Назад', style: TextStyle(color: Colors.white, fontSize: 20)),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class SpecialObjectsScreen extends StatelessWidget {
  final String email;

  SpecialObjectsScreen({required this.email});

  @override
  Widget build(BuildContext context) {
    // Calculate the appropriate padding based on the total height and the number of buttons and spaces.
    double padding = MediaQuery.of(context).size.height * 0.1; // Example padding, adjust based on layout needs

    return Scaffold(
      appBar: AppBar(
        title: Text("Специальные объекты"),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(vertical: padding), // Use dynamic padding for even spacing
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly, // This will ensure even spacing between the widgets.
          children: [
            _buildButton(
              context,
              Icons.house,
              "Мои объекты",
              () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => ObjectsListScreen(email: email),
                ),
              ),
            ),
            SizedBox(height: 16), // Keep consistent spacing between buttons
            _buildButton(
              context,
              Icons.contacts,
              "Общие контакты",
              () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => CommonContactsScreen(),
                ),
              ),
            ),
            SizedBox(height: 16), // Consistent spacing
            _buildButton(
              context,
              Icons.report,
              "Жалоба",
              () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => ComplaintPage(email: email),
                ),
              ),
            ),
            SizedBox(height: padding / 2), // Adjust based on visual needs
          ],
        ),
      ),
      bottomNavigationBar: Container(
        width: double.infinity,
        height: 50,
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFF639019),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.zero,
            ),
            padding: EdgeInsets.zero,
            elevation: 0,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text(
            "Выйти из аккаунта",
            style: TextStyle(
              fontSize: 18,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildButton(BuildContext context, IconData icon, String text, VoidCallback onPressed) {
    return Container(
      height: 100,
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Color(0xFF639019),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0),
          ),
          padding: EdgeInsets.zero,
        ),
        onPressed: onPressed,
        child: Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.only(left: 16.0),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(icon, size: 32.0, color: Colors.white),
                SizedBox(width: 10),
                Text(
                  text,
                  style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 25,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ComplaintPage extends StatefulWidget {
  final String email;

  ComplaintPage({required this.email});

  @override
  _ComplaintPageState createState() => _ComplaintPageState();
}

class _ComplaintPageState extends State<ComplaintPage> {
  late TextEditingController _textController;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController();
  }

  Future<void> _sendComplaint() async {
    final url = "https://script.google.com/macros/s/AKfycbx_5efPv2hBFK0YChKTpUYrXxixL1VP98sNX9zOLJQGGke2ih5XRyok9bcgK8WOXa8znA/exec";
    final response = await http.post(
      Uri.parse(url),
      body: {
        'email': widget.email,
        'text': _textController.text,
      },
    );

    if (response.statusCode == 200) {
      Navigator.of(context).pop();
    } else {
      print("Error sending complaint: ${response.body}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF639019),
        title: Text("Жалоба"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _textController,
              decoration: InputDecoration(
                labelText: "Введите текст жалобы...", // Updated to labelText
                contentPadding: EdgeInsets.symmetric(horizontal: 16),
              ),
              maxLines: 5,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _sendComplaint,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF639019),
                padding: EdgeInsets.symmetric(vertical: 16, horizontal: 32),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0),
                ),
              ),
              child: Text(
                "Отправить",
                style: TextStyle(
                  fontSize: 24,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        width: double.infinity,
        height: 60.0,
        child: ElevatedButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFF639019),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.zero, // Ensures button is full width with no rounding
            ),
          ),
          child: Text(
            "Назад",
            style: TextStyle(
              fontSize: 18,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}

class CommonContactsScreen extends StatefulWidget {
  @override
  _CommonContactsScreenState createState() => _CommonContactsScreenState();
}

class _CommonContactsScreenState extends State<CommonContactsScreen> {
  List<String> buttonTitles = [];

  @override
  void initState() {
    super.initState();
    fetchButtonTitles();
  }

  fetchButtonTitles() async {
    final url = Uri.parse('https://script.google.com/macros/s/AKfycbxfgrFzbVq7NFQEbJ8pKgj68hHh6XU_sWbtqD68MrWCtdOrfLRC6-BVwT7NvNi2Dxd5ig/exec');
    final response = await http.get(url);
    if (response.statusCode == 200) {
      setState(() {
        buttonTitles = List<String>.from(json.decode(response.body));
      });
    } else {
      print('Ошибка загрузки данных');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF639019),
        title: Text("Общие контакты"),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: buttonTitles.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: EdgeInsets.only(
                    top: index == 0 ? 10.0 : 0, // Добавляем отступ сверху только для первой кнопки
                    left: 8.0,
                    right: 8.0,
                    bottom: 4.0,
                  ),
                  child: ContactButton(
                    title: buttonTitles[index],
                    column: String.fromCharCode(65 + index), // A, B, C...
                  ),
                );
              },
            ),
          ),
          Container(
            width: double.infinity, // На всю ширину экрана
            height: 50, // Высота кнопки
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF639019), // Цвет кнопки
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.zero, // Без закруглений
                ),
                padding: EdgeInsets.zero,
                elevation: 0, // Убрать тень
              ),
              onPressed: () => Navigator.of(context).pop(),
              child: Text(
                "Назад",
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}


class ContactButton extends StatelessWidget {
  final String title;
  final String column; // Имя столбца для загрузки деталей

  const ContactButton({
    Key? key,
    required this.title,
    required this.column,
  }) : super(key: key);

  Future<void> _fetchDetailsAndNavigate(BuildContext context) async {
    final url = Uri.parse('https://script.google.com/macros/s/AKfycbxfgrFzbVq7NFQEbJ8pKgj68hHh6XU_sWbtqD68MrWCtdOrfLRC6-BVwT7NvNi2Dxd5ig/exec?column=$column');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final List<String> details = List<String>.from(json.decode(response.body));
      // Переход на страницу деталей с загруженными данными
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => DetailsScreen(details: details),
        ),
      );
    } else {
      // Обработка ошибки загрузки данных
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Ошибка при загрузке данных')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Color(0xFF639019), // Цвет кнопки
          foregroundColor: Colors.white, // Цвет текста
          minimumSize: Size(double.infinity, 50), // Минимальный размер
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10), // Отступы
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5), // Скругление углов
          ),
        ),
        onPressed: () => _fetchDetailsAndNavigate(context),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontFamily: 'Montserrat',
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

class ButtonData {
  String title;
  List<String> content;

  ButtonData({required this.title, required this.content});

  factory ButtonData.fromJson(Map<String, dynamic> json) {
    return ButtonData(
      title: json['title'],
      content: List<String>.from(json['content']),
    );
  }
}

class ObjectsListScreen extends StatefulWidget {
  final String email;

  ObjectsListScreen({required this.email});

  @override
  _ObjectsListScreenState createState() => _ObjectsListScreenState();
}

class _ObjectsListScreenState extends State<ObjectsListScreen> {
  List<ButtonData> _buttonsData = [];

  @override
  void initState() {
    super.initState();
    _fetchObjects();
  }

  Future<void> _fetchObjects() async {
    final uri = Uri.parse('https://script.google.com/macros/s/AKfycbwiLElwtOepk6jeeIhRxPGMDXkeBXHgAuHQo6n2hCIdzqeXMetkEm8rVxuSk6ZuRgalxQ/exec?email=${widget.email}');
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      try {
        final responseBody = json.decode(response.body);
        if (responseBody.containsKey('buttons')) {
          setState(() {
            _buttonsData = (responseBody['buttons'] as List)
                .map((buttonJson) => ButtonData.fromJson(buttonJson))
                .toList();
          });
        } else {
          throw Exception('Invalid data format');
        }
      } catch (e) {
        print('Error parsing JSON data: $e');
        throw Exception('Error parsing JSON data: $e');
      }
    } else {
      throw Exception('Failed to load data with status code: ${response.statusCode}');
    }
  }

   @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Мои объекты"),
      ),
      body: ListView.builder(
        itemCount: _buttonsData.length,
        itemBuilder: (context, index) {
          final button = _buttonsData[index];
          return Container(
            margin: EdgeInsets.all(10.0),
            child: ElevatedButton.icon(
              icon: Padding(
                padding: EdgeInsets.only(right: 18.0), // Отступ для иконки от текста
                child: Icon(Icons.camera_alt, color: Colors.white), // Логотип слева
              ),
              label: Text(
                button.title,
                style: TextStyle(
                  fontFamily: 'Montserrat',
                  fontSize: 16,
                  color: Colors.white,
                ),
              ),
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => DetailsScreen(details: button.content),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF639019), // Цвет фона кнопки
                minimumSize: Size(double.infinity, 50), // Минимальный размер кнопки
                padding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0), // Отступы внутри кнопки
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0), // Закругление углов
                ),
              ),
            ),
          );
        },
      ),
      bottomNavigationBar: Container(
        color: Color(0xFF639019), // Цвет фона контейнера
        width: double.infinity,
        height: 60.0,
        child: TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(
            "Назад",
            style: TextStyle(
              fontSize: 16,
              color: Colors.white,
              fontFamily: 'Montserrat',
            ),
          ),
          style: TextButton.styleFrom(
            backgroundColor: Color(0xFF639019), // Цвет фона кнопки
            minimumSize: Size(double.infinity, 60), // Размер кнопки
          ),
        ),
      ),
    );
  }
}

class DetailsScreen extends StatefulWidget {
  final List<String> details;

  DetailsScreen({required this.details});

  @override
  _DetailsScreenState createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            color: Color(0xFF639019),
            width: double.infinity,
            padding: EdgeInsets.all(16.0),
            child: Text(
              "Детали",
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.normal,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: widget.details.length,
              itemBuilder: (context, index) {
                return Container(
                  margin: EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
                  decoration: BoxDecoration(
                    color: Colors.white, // Фон каждой ячейки
                    borderRadius: BorderRadius.circular(10), // Скругление углов
                    boxShadow: [ // Тень
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 1,
                        blurRadius: 5,
                        offset: Offset(0, 3),
                      ),
                    ],
                    border: Border.all(
                      color: Colors.grey.shade300, // Цвет рамки
                      width: 1, // Ширина рамки
                    ),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Text(
                      widget.details[index],
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            color: Color(0xFF639019),
            width: double.infinity,
            height: 60.0,
            child: TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(
                "Назад",
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'Montserrat',
                  color: Colors.white,
                ),
              ),
              style: TextButton.styleFrom(
                backgroundColor: Color(0xFF639019),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

