// Mock API utilities for development
const USE_MOCK_DATA = true;

// Mock session setup data
const mockSessionSetupData = {
  name: 'Demo Classroom',
  grades: [3, 4, 5],
  grade: '4',
  mute_audio: true,
  assign_student_method: 'educator',
  enabled_SEL_content: ['breathing', 'grounding', 'coloring'],
  available_SEL_categories: 'both',
  educator_check_in: false,
  educator_setup: false,
  student_check_in: false,
  educator_check_in_details: { questions: [] },
  educator_setup_details: { questions: [] },
  student_check_in_details: { questions: [] },
};

export const APIUtils = {
  getAPI_URL: () => {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000/';
  },

  GET: async (url: string) => {
    if (USE_MOCK_DATA) {
      // Return mock data based on the URL
      if (url.includes('session/setup')) {
        return {
          status: 200,
          data: mockSessionSetupData,
        };
      }
      return { status: 200, data: {} };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return { status: response.status, data, statusText: response.statusText };
    } catch (error) {
      console.error('API GET error:', error);
      return { status: 500, data: null, statusText: 'Network error' };
    }
  },

  POST: async (url: string, body: any) => {
    if (USE_MOCK_DATA) {
      // Return mock response for submit_stage
      if (url.includes('submit_stage')) {
        return {
          status: 200,
          data: {
            student_check_in_details: { questions: [] },
          },
        };
      }
      return { status: 200, data: {} };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return { status: response.status, data, statusText: response.statusText };
    } catch (error) {
      console.error('API POST error:', error);
      return { status: 500, data: null, statusText: 'Network error' };
    }
  },

  POST_AUDIO: async (url: string, body: any): Promise<Blob | null> => {
    if (USE_MOCK_DATA) {
      // Return empty blob for mock
      return null;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      return await response.blob();
    } catch (error) {
      console.error('API POST_AUDIO error:', error);
      return null;
    }
  },
};
