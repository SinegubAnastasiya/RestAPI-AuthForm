const btn = document.querySelector('button')

btn.addEventListener('click', async () => {
    const email = document.querySelector('.email').value
    const pwd = document.querySelector('.pwd').value

    const response = await fetch('http://localhost:3000/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pwd })
    })

    const result = await response.json()
    console.log(result);
})