import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertDismissible({ variant, message }) {
    const [show, setShow] = useState(false);

    return (

        <Alert variant={variant}
            className='rounded-0 d-flex align-items-center'>
            <p className='p-0 m-0 text-center'>{message}</p>
        </Alert>

    );
}

