import React from "react";

const MyClass = () => {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              overflow: hidden;
            }

            #container {
              width: 100vw;
              height: 100vh;
              background: radial-gradient(circle at center, #0d0d1a 0%, #000 100%);
              position: fixed;
              top: 0;
              left: 0;
            }

            canvas {
              position: fixed;
              top: 0;
              left: 0;
            }
          `,
        }}
      />
      <div id="container"></div>
    </div>
  );
};

export default MyClass;
