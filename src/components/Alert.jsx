import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertDismissible({ variant='danger', message }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{message}</Alert.Heading>
                {/* <p>
                
                </p> */}
            </Alert>
        );
    }
}

