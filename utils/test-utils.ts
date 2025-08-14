export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateUniqueId(): string {
    // Generate a unique ID using timestamp + random string
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomPart = Math.random().toString(36).substring(2, 8); // Get 6 random chars
    return `${timestamp}${randomPart}`;
}

export function generateRandomName(): string {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'Grace', 'Henry'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore'];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const uniqueId = generateUniqueId();
    
    // Add unique identifier to ensure name uniqueness
    return `${randomFirstName} ${randomLastName} ${uniqueId}`;
}

export function generateRandomEmail(): string {
    // Use timestamp + random string for truly unique emails
    const uniqueId = generateUniqueId();
    const randomString = generateRandomString(6);
    const timestamp = Date.now();
    
    // Combine multiple sources of randomness
    const username = `testuser_${uniqueId}_${randomString}_${timestamp}`;
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'test.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${username}@${randomDomain}`;
}

export function generateSimpleRandomEmail(): string {
    // Alternative simpler approach using crypto-like randomness
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    const randomHex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    
    return `user_${randomHex}@example.com`;
}
  