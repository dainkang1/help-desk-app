import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Define the shape of a ticket for TypeScript
interface Ticket {
  name: string;
  email: string;
  description: string;
  id: string;
  status: 'New' | 'In Progress' | 'Resolved';
}

const tickets: Ticket[] = [];

app.use(cors());
app.use(express.json());

// Endpoint to retrieve all tickets
app.get('/api/tickets', (req: Request, res: Response) => {
  res.json(tickets);
});

// Endpoint to submit a new ticket
app.post('/api/tickets', (req: Request, res: Response) => {
  const ticket = req.body as Partial<Ticket>;
  
  if (!ticket.name || !ticket.email || !ticket.description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  tickets.push(ticket as Ticket);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete('/api/tickets/:id', (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const index = tickets.findIndex(ticket => ticket.id === ticketId);

  console.log('JUST CLICKED DELETE IN SERVER', ticketId, 'ticketId' ,index, 'index')

  if (index === -1) {
    console.log('JUST CLICKED DELETE IN SERVERRR', ticketId, 'ticketId' ,index, 'index')
    return res.status(404).json({ error: 'Ticket not found!' });
  }

  tickets.splice(index, 1);
  res.json({ success: true, message: 'Ticket deleted successfully!' });
});


app.patch('/api/tickets/:id', (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const { status } = req.body;

  if (!['New', 'In Progress', 'Resolved'].includes(status)) {
    console.log('JUST CLICKED PATCHHHHH', status, 'STATUSSSS', ticketId, 'ticketId' , 'index')

    return res.status(400).json({ error: 'Invalid status value!', status});
  }

  const index = tickets.findIndex(ticket => ticket.id === ticketId);

  if (index === -1) {
    return res.status(404).json({ error: 'Ticket not found!' });
  }

  tickets[index].status = status;
  res.json({ success: true, updatedTicket: tickets[index] });
});


