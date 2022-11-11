import { Injectable } from '@angular/core'
import Web3 from 'web3'

@Injectable({
  providedIn: 'root',
})
export class WhisperService {
  web3 = new Web3()
  DEFAULT_CHANNEL = 'default'

  constructor() {
    // this.connectRpcServer();
  }

  // Web3 connection
  async connectRpcServer() {
    try {
      this.web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:3334'))
      await this.web3.eth.net.isListening()
      console.log('Web3 connection established')
    } catch (err) {
      console.log('Web3 connection failed')
    }
  }

  async generateKeyPair() {
    // Generate keypair
    return await this.web3.shh.newKeyPair()
  }

  async generateSymKey() {
    // Generate a symmetric key
    return await this.web3.shh?.generateSymKeyFromPassword('mychat')
  }

  async getPublicKey(privateKey: string) {
    // Get public key from private key
    return await this.web3.shh?.getPublicKey(privateKey)
  }

  async sendPublicMessage(symKeyId: string, keyPair: string, message: string) {
    // Send a public message
    return this.web3.shh.post({
      symKeyID: symKeyId,
      sig: keyPair,
      ttl: 20,
      topic: this.DEFAULT_CHANNEL,
      payload: this.web3.utils.fromAscii(message),
      powTime: 1000,
      powTarget: 1000,
    })
  }

  async subscribeToPublicChat(channelSymKey: string, channelTopic: string) {
    // Subscribe to public chat messages
    return this.web3.shh
      .subscribe('messages', {
        minPow: 1000,
        symKeyID: channelSymKey,
        topics: [this.DEFAULT_CHANNEL],
      })
      .on('data', (data) => {
        // Display message in the UI
        console.log(data.sig, this.web3.utils.toAscii(data.payload))
      })
  }

  async sendPrivateMessage(
    contactCode: string,
    keyPair: string,
    channelTopic: string,
    messageContent: string
  ) {
    // Send private message
    return this.web3.shh.post({
      pubKey: contactCode,
      sig: keyPair,
      ttl: 20,
      topic: this.DEFAULT_CHANNEL,
      payload: this.web3.utils.fromAscii(messageContent),
      powTime: 1000,
      powTarget: 1000,
    })
  }

  async subscribeToPrivateChat(keyPair: string, channelTopic: string) {
    // Subscribe to private messages
    return this.web3.shh
      .subscribe('messages', {
        minPow: 1000,
        privateKeyID: keyPair,
        topics: [this.DEFAULT_CHANNEL],
      })
      .on('data', (data) => {
        console.log(data.sig, this.web3.utils.toAscii(data.payload), true)
      })
  }
}
