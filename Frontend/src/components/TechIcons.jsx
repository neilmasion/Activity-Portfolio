import React from 'react';

export const TechIcon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="#E44D26"/>
          <path d="M12 4.5v15.8l4.8-1.2 1.4-14.6H12z" fill="#F16529"/>
          <path d="M12 8.5H8.3l.3 3h3.4v-3zm0 5.6H9.7l.2 2.2L12 16.9v-2.8z" fill="#EBEBEB"/>
          <path d="M12 8.5h3.7l-.4 3.9H12v-3zm0 5.6h2.2l-.3 2.8L12 17.5v-3.4z" fill="#FFFFFF"/>
        </svg>
      );
    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="#1572B6"/>
          <path d="M12 4.5v15.8l4.8-1.2 1.4-14.6H12z" fill="#33A9DC"/>
          <path d="M12 8.5H8.3l.3 3h3.4v-3zm0 5.6H9.7l.2 2.2L12 16.9v-2.8z" fill="#EBEBEB"/>
          <path d="M12 8.5h3.7l-.4 3.9H12v-3zm0 5.6h2.2l-.3 2.8L12 17.5v-3.4z" fill="#FFFFFF"/>
        </svg>
      );
    case 'js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path d="M7 16.5c.5.8 1.4 1.3 2.5 1.3 1.4 0 2.3-.7 2.3-2.1v-5.2H9.8v5.1c0 .6-.3 1-.9 1-.6 0-.9-.4-1.2-.9L7 16.5zm8.4-1.2c.5.8 1.3 1.2 2.2 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6-1.6-.7-2.7-1.4-2.7-3.1 0-1.6 1.3-2.8 3.2-2.8 1.4 0 2.3.5 3 1.6l-1.6 1c-.3-.5-.7-.8-1.4-.8-.7 0-1.2.4-1.2.9 0 .6.5.9 1.6 1.3 1.8.7 3 1.4 3 3.3 0 1.9-1.5 3-3.6 3-1.8 0-3-.8-3.6-2.1l1.6-1.3z" fill="#000000"/>
        </svg>
      );
    case 'ts':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path d="M6 10h5V8H3.5v2H6v8h2v-8zm8.5 4.3c.5.8 1.3 1.2 2.2 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6-1.6-.7-2.7-1.4-2.7-3.1 0-1.6 1.3-2.8 3.2-2.8 1.4 0 2.3.5 3 1.6l-1.6 1c-.3-.5-.7-.8-1.4-.8-.7 0-1.2.4-1.2.9 0 .6.5.9 1.6 1.3 1.8.7 3 1.4 3 3.3 0 1.9-1.5 3-3.6 3-1.8 0-3-.8-3.6-2.1l1.6-1.3z" fill="#FFFFFF"/>
        </svg>
      );
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
        </svg>
      );
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 3-2.3 5-1.7 1.2.4 2 1.2 3 2.1 1.5 1.6 3.2 3.4 7 3.4 3.3 0 5.3-1.7 6-5-1.3 1.7-3 2.3-5 1.7-1.2-.4-2-1.2-3-2.1-1.5-1.6-3.2-3.4-7-3.4zM5 12c-3.3 0-5.3 1.7-6 5 1.3-1.7 3-2.3 5-1.7 1.2.4 2 1.2 3 2.1 1.5 1.6 3.2 3.4 7 3.4 3.3 0 5.3-1.7 6-5-1.3 1.7-3 2.3-5 1.7-1.2-.4-2-1.2-3-2.1-1.5-1.6-3.2-3.4-7-3.4z" fill="#06B6D4" transform="scale(0.8) translate(3, 3)"/>
        </svg>
      );
    case 'next':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#000000" stroke="#33333F"/>
          <path d="M8.5 7.5v9m0-9l7 9m0-9v6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M19.5 3.5L12.5 21l-7-17.5 7 2.5 7-2.5z" fill="#646CFF"/>
          <path d="M12 7l-2 5h3.5l-2 5 5-7h-3.5l2-3H12z" fill="#FFD62E"/>
        </svg>
      );
    case 'node':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" stroke="#5FA04E" strokeWidth="2" fill="none"/>
          <text x="12" y="15" fill="#5FA04E" fontSize="8" fontWeight="bold" textAnchor="middle">JS</text>
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.5 10.7l-8.2-8.2c-.7-.7-1.9-.7-2.6 0L8.4 4.8l3.3 3.3c.6-.2 1.3-.1 1.8.4.5.5.7 1.3.4 1.9l3.2 3.2c.6-.3 1.4-.1 1.9.4.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.6-.6-.7-1.4-.4-2l-3-3v4.6c.3.2.5.6.5 1 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.8.5-1.1V8.6c-.3-.2-.5-.6-.5-1 0-.6.3-1.1.8-1.3L7.1 3.5 2.5 8.1c-.7.7-.7 1.9 0 2.6l8.2 8.2c.7.7 1.9.7 2.6 0l8.2-8.2c.7-.7.7-1.9 0-2.6z" fill="#F05032"/>
        </svg>
      );
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'figma':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="3" width="7" height="6" rx="3" fill="#F24E1E"/>
          <rect x="12" y="3" width="7" height="6" rx="3" fill="#FF7262"/>
          <rect x="5" y="9" width="7" height="6" rx="3" fill="#A259FF"/>
          <circle cx="15.5" cy="12" r="3" fill="#1ABCFE"/>
          <path d="M5 18a3 3 0 003 3h4v-6H8a3 3 0 00-3 3z" fill="#0ACF83"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53 1.53 1.53 0 0 0-1.53-1.54 1.54 1.54 0 0 0-1.54 1.54c0 .85.69 1.53 1.54 1.53m1.39 9.97v-8.37H5.07v8.37h2.78z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3 3"/>
        </svg>
      );
  }
};
