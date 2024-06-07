import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <Head>
                    <base href={ process.env.PUBLIC_URL } />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700%7CPoppins:300,400,500,600,700" />
                    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/fonts-molla.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/fonts-flaming.css" />
                    <link rel="stylesheet" type="text/css" href="vendor/line-awesome/css/line-awesome.min.css" />
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                </Head>
                <body>
                    <Main />
                    <script src="js/jquery.min.js"></script>
                    
                    <NextScript />
                </body>
            </Html>
        )
    }
}