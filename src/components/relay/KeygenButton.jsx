import Button from '../input/Button'
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools'
// import NDK, { NDKEvent, NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'

export default ({ disabled=false, cb }) => {
    const createPrivateKey = async () => {
        const privateKey = await generatePrivateKey()
        const publicKey = await getPublicKey(privateKey)

        ///////////////
        // const signer = new NDKPrivateKeySigner(privateKey)
        // const ndk = new NDK({
        //     explicitRelayUrls: ["ws://localhost:4736"],
        //     // signer: new NDKNip07Signer() // for requesting signatures from the user (e.g. alby)
        //     signer: signer // for signing events with the generated private key
        // })
        // await ndk.connect()

        // const user = {
        //     name: 'learn-nostr',
        // }

        // const event = {
        //     pubkey: publicKey,
        //     kind: 0,
        //     content: JSON.stringify(user, null, 2),
        //     created_at: Math.floor(Date.now() / 1000),
        //     tags: [],
        // }

        // const ndkEvent = new NDKEvent(ndk, event)
        // const signed = await ndkEvent.sign(signer)
        // const res2 = await ndkEvent.publish()

        // console.log(event)
        // console.log(ndkEvent)
        // console.log('signed:', signed)
        // console.log(res2)
        ///////////////
        const nsec = nip19.nsecEncode(privateKey)
        const npub = nip19.npubEncode(publicKey)

        cb({ nsec, npub, privateKey, publicKey })
    }

    return (
        <Button
            onClick={createPrivateKey}
            disabled={disabled}
        >
            Generate Private Key
        </Button>
    )
}