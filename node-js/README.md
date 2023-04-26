# ios-push-notifications

See this [tutorial](https://devtails.xyz/@adam/how-to-setup-web-push-notifications-in-ios-safari) for instructions.

# Set up

1. run ```yarn```
2. run ```./node_modules/.bin/web-push generate-vapid-keys``` to get the vapid Public and Private
    - like this
    ```
   =======================================
   
   Public Key:
   [[Big long string]]
   
   Private Key:
   [[Slightly less long string]]
   
   =======================================
   ```
3. create ```.env``` file and copy public and private key and paste them in ```.env``` file
    - like this
      ```
      VAPID_PUBLIC_KEY=[[Big long string from above]]
      VAPID_PRIVATE_KEY=[[Slightly less long string from above]]
      VAPID_MAILTO=your@email.com
      ```
4. paste the public key to ```public/index.js``` and replace```[[INSERT YOUR PUBLIC VAPID KEY HERE]]```
5. run ```npm run dev```
