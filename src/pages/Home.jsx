import React from 'react';
import TaskManager from '../components/TaskManager';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto">
        <TaskManager />
      </div>
    </Layout>
  );
}
