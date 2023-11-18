import { useState } from "react"
import Doc from "../../components/Doc"
import Section from '../../components/Section'
import EventListener from "../../components/relay/EventListener"
import EventPublisher from "../../components/relay/EventPublisher"
import JSONDisplay from "../../components/JSONDisplay"
import KeygenButton from "../../components/relay/KeygenButton"
import { WebSocketProvider, useWebSocket } from "../../contexts/WebsocketContext"
import RelayConnectionInput from "../../components/relay/RelayConnectionInput"

export default () => {
    const relay = useWebSocket()

    const [keys, setKeys] = useState({})

    const handleKeygen = (data) => {
      alert(`Your new private key is:\n\n${data.nsec}\n\nIt will also been saved in state under the "Current Private Key" section.`)
      setKeys(data)
    }

    return (
      <WebSocketProvider>
        <Doc title='Getting Started'>
            <Section id='introduction' part='00' title='Introduction'>
              <p>Nostr is a simple, open protocol that enables global, decentralized, and censorship-resistant social media. This page will teach you the basics of how it works.</p>
              <p>Nostr has sub-protocols called NIPs (Nostr Implementation Possibilities). They provide solutions to functionaliy implementation in a public manner, so we don't end up with individual apps with functionality that doesn't work with other apps. There are many NIPs that add various features to Nostr like sending lightning payments, creating users, etc.</p>
              <p>All NIPs build off the first one: NIP-01. This page goes over the functionalities that make up NIP-01, the foundation.</p>
            </Section>

            <Section id='key-pairs' part='01' title='Key-Pairs'>
                <p>Each user has a key-pair consisting of a public and a private key. Your public key is like your username, and your private key is like your password. Nobody should ever see your private key, and it should be kept somewhere very safe.</p>
                <p>The buttons below give you a hands-on experience creating your own key-pair.</p>
                <p>The keys you generate here are real and can be used to define your identity throughout any application built on the Nostr protocol.</p>
                <p>You can copy a private key to your clipboard and paste it in the notepad on this page to re-use it for the next interactive walkthroughs. If you do so, it's not recommended to use those keys for anything important since it will be saved in your browser's local storage which isn't the most secure place to put them.</p>
                <p>If you don't save the private key it will be lost when you leave this page, but you can just generate a new one.</p>

                <div className='flex gap-5'>
                    <KeygenButton
                      cb={handleKeygen}
                      disabled={keys?.npub}
                    />
                </div>

                <div>
                    <p>Current Private Key: {keys.nsec ?? '...'}</p>
                    <p>Current Public Key: {keys.npub ?? '...'}</p>
                </div>
            </Section>

            <Section id='relays' part='02' title='Relays'>
                <p>Relays are the heart of the Nostr protocol. Simply, they are WebSocket servers that receive and (usually) store event data. Clients can then request data from the relay in order to display them in an easily-readable frontend. Connecting to a relay is as simple as connecting to a WebSocket server.</p>
                <p>Nostr is a decentralized protocol because anyone can create a relay, and the relays you read from and publish to are configured in your own account (accounts will be covered in a later section), making Nostr decentralized by default.</p>
                <p>Enter a WebSocket URL in the text input below, or use the one provided, and click the button. This will connect you to the relay at the specified URL, and this connection will be used in the next sections.</p>
                <p>You can find a list of public relays to try out on <a href='https://nostr.watch' target='_blank' rel='noreferrer'>nostr.watch</a>.</p>
                
                <RelayConnectionInput />
            </Section>

            <Section id='events' part='03' title='Events'>
              <p>If relays are the heart of Nostr, events are the blood. They are <a href='https://www.w3schools.com/whatis/whatis_json.asp' target='_blank' rel='noreferrer'>JSON</a> messages that are sent to relays containing the following format:</p>

              <JSONDisplay
                json={
                  {
                    "id": "<the serialized event data signed with the private key of the creator>",
                    "pubkey": "<public key of the creator of the event>",
                    "created_at": "<unix timestamp in seconds>",
                    "kind": "<integer between 0 and 65535. represents the type of event being sent>",
                    "tags": [ ["<used to reference other events, users, or replaceable event>", ""], "..." ],
                    "content": "whatever text-based data you want to post!",
                    "sig": "this event data signed with the private key of the creator"
                  }
                }
              />

              <p><em>It may seem daunting at first, but once you learn how events work, you understand most of Nostr.</em></p>
              <p>When a relay receives an event, it stores it to be accessed by clients later on.</p>
            </Section>

            <Section id='reading-events' part='04' title='Reading Events'>
              <p>Communicating with a relay is as simple as sending some JSON data to a WebSocket server... because that's literally all you have to do.</p>
              <p>In order to request events from a relay, all you have to do is send a JSON message to the relay, via WebSocket, with the following format:</p>

              <JSONDisplay
                json={["REQ", "<subscription_id>", "<filters>..."]}
              />

              <p>
                "REQ" tells the relay you are subscribing to the event stream.<br/>
                "subscription_id" is an identifier you can use to keep track of our subscriptions.<br/>
                "filters" is JSON data you can configure to put filters and limits on the data we request.
              </p>

              <p>If you want to end our subscription, just send the following JSON to the relay:</p>

              <JSONDisplay
                json={["CLOSE", "<subscription_id>"]}
              />

              <p>Click the button below to subscribe to new events using the connection you made to a relay in the previous section. Additionally, it's been set up to fetch the 5 latest events for demonstration purposes.</p>
              
              <EventListener />
            </Section>

            <Section id='publishing-events' part='05' title='Publishing Events'>
              <p>Publishing events is </p>
              <p>Configure the below text input to your liking, then click the button below to perform the following actions:</p>
              <ol className='ml-2 list-decimal list-inside'>
                <li>Construct the event object (JSON).</li>
                <li>Add your public key to the event.</li>
                <li>Generate the id for the event.</li>
                <li>Sign the event with the private key you generated previously.</li>
                <li>Publish the event to the relay you're connected to.</li>
              </ol>

              <EventPublisher
                keys={keys}
              />

              <p>If you're still subscribed to the relay, you should see your event appear in the previous section.</p>
              
              <p>In a real application, an event containing the content of your post is sent to all the relays you're configured with, not just one. Those relays store the event to be accessed by any client that connects to it.</p>
            </Section>
        </Doc>
      </WebSocketProvider>
    )
}