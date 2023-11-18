import React, { createContext, useState, useEffect, useContext } from 'react'
import { relayInit } from 'nostr-tools'

// Create contexts
const WebSocketContext = createContext(null)
const ConnectWebSocketContext = createContext(null)
const DisconnectWebSocketContext = createContext(null)

// Create a provider component
export const WebSocketProvider = ({ children }) => {
    const [relay, setRelay] = useState(null)

    const connect = async (url) => {
        const connectPromise = new Promise(async (resolve, reject) => {
            const relay = relayInit(url)
            relay.on('connect', () => {
                setRelay(relay)
            })
            relay.on('error', () => {
                setRelay(null)
            })
            relay.on('disconnect', () => {
                setRelay(null)
            })
            try {
                await relay.connect()
                resolve(relay)
            } catch(err) {
                reject(err)
            }
        })

        return connectPromise
    }

    const disconnect = async () => {
        const disconnectPromise = new Promise(async (resolve, reject) => {
            if(!relay) return resolve(true)
            try {
                await relay.close()
                setRelay(null)
                resolve(true)
            } catch(err) {
                reject(err)
            }
        })
        return disconnectPromise
    }

    useEffect(() => {
        return () => disconnect()
    }, [disconnect])

  return (
    <WebSocketContext.Provider value={relay}>
        <ConnectWebSocketContext.Provider value={connect}>
            <DisconnectWebSocketContext.Provider value={disconnect}>
            {children}
            </DisconnectWebSocketContext.Provider>
        </ConnectWebSocketContext.Provider>
    </WebSocketContext.Provider>
  )
}

// Create a hook to use the WebSocket connection
export const useWebSocket = () => {
  return useContext(WebSocketContext)
}

// Create a hook to use the connect function
export const useConnectWebSocket = () => {
    return useContext(ConnectWebSocketContext)
}

// Create a hook to use the disconnect function
export const useDisconnectWebSocket = () => {
    return useContext(DisconnectWebSocketContext)
}