# Standup-App
The Standup app for Rocket.Chat is a tool designed to facilitate daily standup meetings by allowing team members to quickly share their updates and progress in a structured format.

## Installation

To install this app, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/devanshkansagra/Standup-App
```

2. Navigate to the `standups` directory.

3. Open Terminal (or CMD in Windows) and run the following command:

```
rc-apps deploy --url host_url --username your_username --password your_password
```

Make sure to replace `host_url`, `your_username`, and `your_password` with your Rocket Chat server URL, username, and password respectively.

Note: 
- You must have a Rocket Chat server set up. If you haven't set up a Rocket Chat server yet, follow this [link](https://developer.rocket.chat/open-source-projects/server/server-environment-setup) for instructions.
- You must have Rocket Chat CLI installed in your system to run `rc-apps` command. You can this install via

  ```
  npm install -g @rocket.chat/apps-cli
  ```
