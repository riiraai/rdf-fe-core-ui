import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Membersihkan setelah setiap test selesai agar tidak ada efek samping antar test
afterEach(() => {
	cleanup();
});
