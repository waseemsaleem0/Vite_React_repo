
# Tech stack

https://github.com/waseemsaleem0/Vite_React_repo


TypeScript React.js, Recoil, Vite, Axios, Tailwind CSS
C# .Net core (Node.js, Go), microservices architecture running on Google Cloud (Docker/Kubernetes)
direct REST Api communication + RabbitMQ, TDD, Jenkins CI/CD, Elastic Stack, MS Teams, ClickUp
Hardware: Dell / Win + Headset, Monitor (optional Macbook)

Finance:
    - finance project dev and migration to azure in XDimentions
    - CAP module of finance product suite in NETSOL.

### Typescript React.js

projects:

- Argos Project
- Marketing platform Project
- Restaurants marketing application

### Recoil

https://recoiljs.org/docs/introduction/getting-started/

**Recoil JS** is a state management library specifically designed for React. It provides a simple and intuitive way to manage and share state across components, making it easier to build large-scale React applications. The main purpose of using Recoil in React is to manage and centralize the application's state, allowing for more efficient data flow and reducing the prop-drilling burden.

Regarding the comparison between **React Redux and React Recoil**, here are some key differences:

Complexity: React Redux has a steeper learning curve compared to Recoil due to the need for understanding core Redux principles and concepts. In contrast, **Recoil is easier to learn and use**, as it is more straightforward and focused on React.
Boilerplate: React Redux often requires more boilerplate code and setup to get started, while **Recoil has a more concise and automated approach**.
Performance: Recoil outperforms React Redux in handling large and complex applications due to **its atomic approach to managing state**.
Use Cases: React Redux is more suited for applications that require time-travel debug

**zustand**:

https://docs.pmnd.rs/zustand/getting-started/introduction

A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.

Don't disregard it because it's cute, it has claws! Lots of time was spent to deal with common pitfalls, like the dreaded zombie child problem, React concurrency, and context loss between mixed renderers. It may be the one state manager in the React space that gets all of these right.

You can try a live demo here.

### Vite

https://vitejs.dev/guide/

Overview
Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

Vite is opinionated and comes with sensible defaults out of the box. Read about what's possible in the Features Guide. Support for frameworks or integration with other tools is possible through Plugins. The Config Section explains how to adapt Vite to your project if needed.

Vite is also highly extensible via its Plugin API and JavaScript API with full typing support.

Command Line Interface
In a project where Vite is installed, you can use the vite binary in your npm scripts, or run it directly with npx vite. Here are the default npm scripts in a scaffolded Vite project:
```json

json
{
  "scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
}
```

#### Vite examples with react-ts js

Sure, here's an example of how you can use Vite with React and TypeScript:

First, you need to install the necessary dependencies:

```bash
npm init @vitejs/app my-react-app --template react-ts
```

This will create a new Vite project with React and TypeScript templates.

Next, navigate to the project directory and install the dependencies:

```bash

cd my-react-app
npm install
```

Now, you can start the development server by running:

```bash
npm run dev
```

This will start the Vite development server and open up a browser window at http://localhost:5000/.

Here's a simple example of a React component using TypeScript:


src/components/Hello.tsx

```typescript

import React from 'react';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

export default Hello;

```

You can then use this component in your main App.tsx file like this:

src/App.tsx


import React from 'react';
import Hello from './components/Hello';

const App = () => {
  return (
    <div>
      <Hello name="World" />
    </div>
  );
};

export default App;
This will render a simple "Hello, World!" heading on the screen.


### Axios

alternative Fetch library

Creating Axios Hooks
Now, let’s apply the above technique to create an Axios hook. First, make sure you’ve got Axios installed in your project.
```bash

npm install axios
```

Let’s start with sample useAxiosPost() hook.

```typescript

const useAxiosPost = (url, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          url,
          payload
        );

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { data, error, loaded };
};

```

Depending on your preference, you might also prefer the “traditional” Promise syntax, which can be a bit more compact.

```typescript

const useAxiosPost = (url, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post(url, payload)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);

  return { data, error, loaded };
};

```

The hook uses Axios’s post() shorthand method to send a POST request to the provided URL with given data. Aside from that, JSON-parsed response data is stored in data, and the error message is stored in error. The hook can be used as follow:

```typescript

const App = () => {
  const { data, error, loaded } = useAxiosPost(
    "https://httpbin.org/post",
    {
      message: "Hello World",
    }
  );
  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  if (loaded) {
    return error ? (
      <span>Error: {error}</span>
    ) : (
      <p>{stringifiedData}</p>
    );
  }
  return <span>Loading...</span>;
};
```

As you can see, the hook provides all necessary data to render the component throughout the fetching process.

Improving the hook
With a strong foundation, you can now improve the hook’s functionality. Let’s change the post() method to request(), passing a complete request configuration including the request method. Additionally, return a cancel function that allows users to cancel the request.

```typescript

const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};

```

#### Extending integration with React Context

While the hook is already great for all kinds of requests, you can still get it further by combining it with React Context.

Axios provides functionality to create separate instances of the library with different configurations. It allows you to use custom configs defining, e.g., base URL or default headers to be supplied with every request made through a given instance. It’s handy in larger apps when making many requests to the same origin or connecting with various APIs to reuse configuration.

On top of that, Axios allows you to define interceptor functions for both the base and custom instances. These allow you to intercept the data before, e.g., the request is sent, or then() callback is called. As such, there are both request and response interceptors.

To integrate Axios instances with React, you can use React Context. It’d make the instance available to all child components, from where useAxios() hooks will use it to handle the request. If no instance is available, the hook can always fall back to the default one available under axios. To implement this, start by creating a new context provider component:
```typescript

const AxiosContext = createContext(null);
const AxiosInstanceProvider = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}) => {
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(
        interceptor
      );
    });
    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(
        interceptor
      );
    });
  }, []);

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

```

Inside the AxiosInstanceProvider component, the Axios instance is created using provided config and saved to instanceRef ref. All interceptors are registered inside the useEffect() callback to prevent unnecessary processing on re-renders. With this done, return to useAxios() to adjust the hook to use the context-provided Axios instance when available.

```typescript

const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          signal: controllerRef.current.signal,
          data: payload,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};

```

The context is loaded using useContext() hook to the contextInstance variable. The actual instance results from useMemo() computation and can return the default Axios instance if it’s not provided in the context. To use such a setup, make sure your app is wrapped inside an AxiosInstanceProvider component, at least a level higher than where you’ll use useAxios() Hook. You can provide config and different interceptors as component props.
```typescript

const App = () => {
  return (
    <AxiosInstanceProvider
      config={{ baseURL: "https://httpbin.org/" }}
    >
      <Test>Test</Test>
    </AxiosInstanceProvider>
  );
};
```

Then, inside the child component, simply use the Hook like before. The use of context, sending, and processing the request will all happen in the background.

```typescript

const Test = () => {
  const { data, error, loaded } = useAxios(
    "/post",
    "POST",
    {
      message: "Hello World",
    }
  );
  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  if (loaded) {
    return error ? (
      <span>Error: {error}</span>
    ) : (
      <p>{stringifiedData}</p>
    );
  }
  return <span>Loading...</span>;
};

```

Bottom line

Axios is an excellent library if you want consistent data-fetching experience across your front end and Node.js back end. For an HTTP client, it has many features and shortcuts to achieve the thing you want in the best and most pleasing way.

Combining Axios with React can result in great abstraction on top of an asynchronous task. Thanks to React Hooks, the ergonomics and ease of use of such a setup are simply outstanding. If you want to use those two in your next project, you’ve just learned how.


### Tailwind CSS

used in restuarnts marketing project
alternatives: boostrap, reactstrap, material ui

what is Tailwind CSS?
why should we use it?
How to integrate it in react project?

Tailwind CSS is a utility-first CSS framework that is highly customizable and allows for low-level CSS writing. It promotes rapid and consistent development by providing classes for nearly every CSS attribute.

The reasons to use Tailwind CSS are:

Customizability - Tailwind CSS is highly customizable and can be easily integrated with existing design systems.
Consistency - The use of a utility-first approach ensures consistent styling throughout a project.
Efficiency - Tailwind CSS promotes the separation of concerns, leading to more maintainable code.
To integrate Tailwind CSS in a React project, you can use the following steps:

Install Tailwind CSS and its dependencies using the following command:
```bash

npm install tailwindcss postcss autoprefixer
```
Create a PostCSS configuration file (postcss.config.js) with the following content:

```javascript

module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
  ],
}
```

Create a tailwind.config.js file with the following content:

```javascript

module.exports = {
  purge: [],
 
```

OR


Create your project
Start by creating a new React project with Create React App v5.0+ if you don't have one already set up.

Terminal
```bash

npx create-react-app my-project
cd my-project
```

Install Tailwind CSS
Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file.

```bash

npm install -D tailwindcss
npx tailwindcss init
```

Configure your template paths

Add the paths to all of your template files in your tailwind.config.js file.

tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add the Tailwind directives to your CSS

Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

index.css

```css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Start your build process
Run your build process with npm run start.

```bash

npm run start
```

Start using Tailwind in your project
Start using Tailwind’s utility classes to style your content.

App.js

```javascript

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

___


### C# .Net core (Node.js, Go)

### microservices architecture running on Google Cloud (Docker/Kubernetes)

### direct REST Api communication + RabbitMQ

worked in rabbitmq, rest api for 5 years and also worked its alternatives.
Hubspot integration using rabbitmq/apache Kafka/apache airflow

Alternatives: Apache airflow, apache kafka

projects:

- Argos logistics project: warehouse management
- cockpit and retromotion

### TDD

jest, mocha, xunit, nunit, ms build unit testing

we use it in all projects almost.

### Jenkins CI/CD

I have hands-on CI/CD. also worked in its alternatives

azure devops

- Argos logistics project: warehouse management

gitlab

- cockpit and retromotion

### Elastic Stack

i have hands-on with Elastic search in cockpit, globaltranz projects.

### MS Teams

slack in retromotion

mostly skype and ms teams

### ClickUp

worked with its alternatives like Google docs, MS Words, Notion and Confluence.
