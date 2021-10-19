# Offline Pass
An app for maintaining a good password hygiene. 

## What is password hygiene?
- Passwords should not be obvious, easy to guess or common
- Passwords should be unique for each app or website
- Passwords should be changed regularly
- Passwords should not be shared with anyone

## Motivation
Password managers are convinient tools for mantaining a good password hygiene but they are expensive, centralized and maybe vulerable. They know or can know your passwords if they like. If you're looking for a free tool to keep control of your passwords, this is might be the one. Here are some of the design requirements we set for the app. See if it fits your needs.

## Design requirements
- **Offline**: ALL passwords are stored locally on the device. No central servers or internet required.
- **Encrypted**: ALL passwords are algorithmically generated and stored in encrypted form on the app.
- **Recoverable**: ALL passwords are recoverable using the master security key.

# Master Security Key (MSK)
All you need to store is Master Security Key (MSK). This key is used to generate all the passwords deterministically. So as long as you have your MSK, all of your passwords (past, present and future) can be recovered. It is your responsibility to keep it safe. If you loose it, you'll loose all your passwords.
MSK Example: `1 # 48CE EF75 D3A8 81A9 B362 5EC7` (without spaces).

# How Offline Pass works?
Passwords are generated using secure hash functions using the following algorithm
```
PasswordHash = SHA256(BaseTimestamp, Index, MSK, Host, Identity)
Password     = Index$PasswordHash
```
- The generated passwords are time based and expires every 90 days. `BaseTimestamp` is the Unix timestamp updated every 3 months.
- Index: Index indicates how many times the password has been generated since the base timestamp (in the 90 days interval). If new passwords hasn't been generated then the index remains zero (0). For each new generated password, the index value increases.
- MSK: Master Security Key
- Host: Host indicates the URL of the app or website. For eg. facebook.com, twitter.com, gmail.com, github.com, ...
- Identity: Identity can be your username, email address or phone number you use to login to the app or website.

**Example**
To generated Twitter password for mail@example.com generated on October 19, 2021:
First, the BaseTimestamp is calculated using integer division as:
```
BaseTimestamp = (Current timestamp // 86400 x 90) x (86400 x 90)
```
For October 19, 2021, the base timestamp becomes `1632960000` which translates to `30/09/2021, 00:00:00 UTC`.

Then, the generated password is:
```
PasswordHash = SHA256(BaseTimestamp, Index, MSK, Host, Identity)
             = SHA256(1632960000, 0, "1#48CEEF75D3A881A9B3625EC7", "twitter.com", "mail@example.com") 
             = 5AD5F645370AE0E9C6DFD9C19E4A62028B8F0CBE6757297868E8E0D4C9A015C5

Password     = Index$PasswordHash 
             = 0$5AD5F645370AE0E9C6DFD9C19E4A62028B8F0CBE6757297868E8E0D4C9A015C5
```

Depending on the application implementation, the number of bytes used and the encoding could be selected differently. For eg. base58 encoding instead of Hex and shorter length eg. 16 characters.


# License
Apache v2 License.

# Contributing
If you're interested in contributing, you can do so by creating an issue (bug report, feature requests, questions, ...) or submitting a Pull Request.

