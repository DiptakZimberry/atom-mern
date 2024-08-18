const XSvg = (props) => (
	<svg
	  aria-hidden="true"
	  viewBox="0 0 100 100"
	  fill="none"
	  xmlns="http://www.w3.org/2000/svg"
	  {...props}
	>
	  <defs>
		<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
		  <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
		  <stop offset="50%" stopColor="#22c55e" /> {/* green-500 */}
		  <stop offset="100%" stopColor="#818cf8" /> {/* indigo-400 */}
		</linearGradient>
	  </defs>
	  <g fill="none" stroke="url(#gradient)" strokeWidth="2">
		{/* Electron orbits */}
		<ellipse cx="50" cy="50" rx="30" ry="12" />
		<ellipse cx="50" cy="50" rx="12" ry="30" transform="rotate(30 50 50)" />
		<ellipse cx="50" cy="50" rx="12" ry="30" transform="rotate(-30 50 50)" />
		
		{/* Nucleus */}
		<circle cx="50" cy="50" r="7" fill="url(#gradient)" />
		
		{/* Electrons */}
		<circle cx="80" cy="50" r="3" fill="url(#gradient)" />
		<circle cx="50" cy="20" r="3" fill="url(#gradient)" />
		<circle cx="20" cy="50" r="3" fill="url(#gradient)" />
		<circle cx="50" cy="80" r="3" fill="url(#gradient)" />
	  </g>
	</svg>
  );
  
  export default XSvg;
  