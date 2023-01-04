# OfflinePass
Self Service Password Manager

## Generate all your passwords deterministically using your Master Key. 
Your Master Key is your one and only backup of all passwords.

## Philosophy
  - No central server. No server at all. Fully client side. Works Offline.
  - No data to store or share. 
  - No data or passwords to backup. Backup your Master Key only.
  - No hidden agenda or false promise of security. We’re open source. Check the code for yourself.

## Source Code
  https://github.com/sireto/offlinepass
  
# Master Security Key (MSK)
All you need to store is Master Security Key (MSK). This key is used to generate all the passwords deterministically. So as long as you have your MSK, all of your passwords (past, present and future) can be recovered. It is your responsibility to keep it safe. If you loose it, you'll loose all your passwords.

# How Offline Pass works?
Passwords are generated using secure hash functions using the following algorithm
``` 
PasswordHash = hmac(MSK,Message,sha256_algorithm)
Password     = Index$PasswordHash
```
- The generated passwords are based on MSK and Message.
- Message = Host | Identity | Year | No of password changed
- MSK: Master Security Key
- Host: Host indicates the URL of the app or website. For eg. facebook.com, twitter.com, gmail.com, github.com, ...
- Identity: Identity can be your username, email address or phone number you use to login to the app or website.
- No of password changed : It indicates number of password changes on selected year. By default it is set to 0.    
- Year : Year you changed your password. By default it is set to current year.

**Example**
To generated Twitter password for mail@example.com on 2023:
First, convert all details into lowercase and concatinate it to Message.
```
Message = `twitter.com | mail@example.com | 2023 | 0`
```
Then, the generated password is:
```
PasswordHash = hmac(MSK,Message,sha256_algorithm)
             = hmac("H@rdPassw0rd",`twitter.com | mail@example.com | 2023 | 0`,"SHA-256")
             = 87booSaeaKYnhgEq

Password     = No_of_password_change$PasswordHash 
             = 0$87booSaeaKYnhgEq
```

base58 encoding is used after using hmac to get shorter length eg. 16 characters.


# License
Apache v2 License.

# Contributing
If you're interested in contributing, you can do so by creating an issue (bug report, feature requests, questions, ...) or submitting a Pull Request.
