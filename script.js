// Add event listener to the Track Order button
document.getElementById('trackOrderBtn').addEventListener('click', async () => {
    const orderId = document.getElementById('orderId').value.trim();
    if (!orderId) {
        alert('Please enter a valid Order ID.');
        return;
    }

    try {
        // Example API call - replace with actual secure backend API
        const response = await fetch('/track-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
            throw new Error('Order not found or API error');
        }

        const data = await response.json();
        // Handle successful response (show order status or details)
        alert(`Order Status: ${data.status}`);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
