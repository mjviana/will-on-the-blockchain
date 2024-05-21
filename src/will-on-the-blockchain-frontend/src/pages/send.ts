// import { resend } from "../lib/resend";

// const send = async (req: Request, res: Response) => {
//   const {method} = req;

//   switch (method) {
//     case "GET": {
//       const data = await resend.emails.send({
//         from: "mj.viana1993@hotmail.com",
//         to: "mj.viana1993@gmail.com",
//         subject: "test",
//         text: "hello world!",
//       });

//       return res.status(200).send(data);
//     }
//     default:
//       res.setHeader("Allow", ["GET"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// };

// export default send;
