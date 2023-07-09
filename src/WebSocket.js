class WebSocketService {
  constructor() {
    this.sockets = {};
  }

  connect(id) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.hostname}:8001/ws?id=${id}`;
    const socket = new WebSocket(wsUrl, id);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = this.handleMessage;

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed', event?.reason);
      delete this.sockets[id];
    };

    this.sockets[id] = socket;
  }

  handleMessage(event) {
    return event.data;
  }

  sendMessage(data) {
    const { id } = data;
    const socket = this.sockets[id];

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('Socket is not open for sending');
      return;
    }

    socket.send(JSON.stringify(data));
  }

  disconnect(id) {
    if (!id) {
      for (const ws in this.sockets) {
        ws.close();
      }

      this.sockets = {};
    } else if (id in this.sockets) {
      this.sockets[id].close();
    }

  }
}

const websocket = new WebSocketService();

export default websocket;
