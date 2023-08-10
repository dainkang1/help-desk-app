import Link from 'next/link';
import React, { ChangeEvent, useState, useEffect } from 'react';

type Ticket = {
  id: string;
  name: string;
  email: string;
  description: string;
  status: string;
};

export default function Admin () {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tickets');
        const data: Ticket[] = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tickets.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (ticketId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      console.log('DELETE WAS CLICKED', response, ticketId, typeof(ticketId), 'response')
  
      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }
  
      // Update the tickets state to remove the deleted ticket
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleSubmit = async (ticketId: string) => {

    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'In Progress' }),
      });

      const updatedTickets = tickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: 'In Progress' } : ticket
      );
      setTickets(updatedTickets);
      alert('Your response has been submitted!')
    } 
    
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }



  const handleStatusChange = async (event: ChangeEvent<HTMLSelectElement>, ticketId: string) => {
    const newStatus = event.target.value as 'New' | 'In Progress' | 'Resolved';
    console.log('NEWSTATAUSSSSs,', newStatus, event.target.value, ticketId, JSON.stringify({ status: newStatus }))
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      const updatedTickets = tickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);

      // Refresh the tickets list or update the state to reflect the new status
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <ul>
      {tickets.map(ticket => (
        <li key={ticket.id}>
          <div><strong>{ticket.name}</strong></div>
          <div>{ticket.email}</div>
          <div>{ticket.description}</div>
          <div> TICKET ID {ticket.id} </div>
          <div>
            Status: 
            <select value={ticket.status} onChange={(e) => handleStatusChange(e, ticket.id)}>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div>
            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
          <div>
            <textarea 
                placeholder="Enter your response here..."
            ></textarea>
            <button onClick={() => handleSubmit(ticket.id)}>Respond</button>
        </div>
        </li>
      ))}
      </ul>
    </div>
  );
};

