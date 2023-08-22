import { createServer } from "miragejs";
import employeeList from "../mockdata/employeeList";

const REACT_APP_BASE_URL = "http://localhost:5173";
export default function makeServer() {
  createServer({
    routes() {
      this.urlPrefix = REACT_APP_BASE_URL;

      this.get(`/employees`, () => employeeList);

      this.post(
        `/employee`,
        () => {
          return new Response(status);
        },
        { timing: 2000 }
      );
    },
  });
}
