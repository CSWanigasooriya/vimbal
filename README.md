# Vimbal

## Working Prototype

- https://vimbal.web.app

## How to Setup

### Prerequisites

- NodeJs: [NodeJs](https://nodejs.org/en/download/)
- Ganache: [Ganache](https://trufflesuite.com/ganache/index.html)
- MetaMask Extension: [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

1. Open Ganache and Start an Instance

![image](https://user-images.githubusercontent.com/53285026/159238772-6c711d55-e072-4d85-a7ab-70deac50dbaf.png)

2. Copy Private Key from Ganache Account

![image](https://user-images.githubusercontent.com/53285026/160361607-2eeb1baf-2820-4678-acfd-84b35de73283.png)

3. Setup MetaMask Network for Testing by Clicking on Add Network

![image](https://user-images.githubusercontent.com/53285026/160362174-23c3026b-2ec6-4cf1-9dd6-53e55635264f.png)

4. Insert the RPC Server URL from the Ganache Instance and Save the Network as Shown Below.

![image](https://user-images.githubusercontent.com/53285026/160363036-f948e32b-a6d5-4b7b-9ff7-ebf0deaba36d.png)

![image](https://user-images.githubusercontent.com/53285026/160363341-b1be896e-b25f-45a8-a164-a1d2039a1a20.png)

5. Import Ganache Account to MetaMask by pasting the Private Key from Step 2.

![image](https://user-images.githubusercontent.com/53285026/160363990-229464f7-91a1-4d24-9694-dc8beafcb859.png)

![image](https://user-images.githubusercontent.com/53285026/160364068-06d22a0b-0866-4480-8ed3-76cf7ccbbef1.png)

6. Install Angular CLI

```
npm install -g @angular/cli
```

7. Install NX

```
 npm install -g nx
```

8. Install Truffle

```
npm install -g truffle@5.1.65
```

9. Clone Project and Navigate to Folder

```
git clone https://github.com/CSWanigasooriya/vimbal
cd vimbal
```

10. Install Node Modules

```
npm install --legacy-peer-deps
```

11. Compile Smart Contracts

```
truffle compile
```

12. Migrate Contracts to Blockchain

```
truffle migrate --reset
```

13. Serve the application

```
npm start
```

## Commit Guidelines

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test|chore
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.
