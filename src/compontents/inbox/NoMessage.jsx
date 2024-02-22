const NoMessage = () => {
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        
        <p class="hero min-h-screen bg-base-200">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">No conversation selected!</h1>
              <p class="py-6">
               Select an user from left to view all message.
              </p>
              
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default NoMessage;
