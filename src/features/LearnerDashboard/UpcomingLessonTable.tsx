const UpcomingLessonTable = () => {
  return (
    <>
      <div class="w-full overflow-x-auto rounded-md border">
        <table class="table table-pin-rows table-pin-cols table-md h-full">
          <thead>
            <tr>
              <td>Title</td>
              <td>Time</td>
              <td>Tutor</td>
              <td>Location</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lesson 1</td>
              <td>12:00 - 13:00</td>
              <td>John Doe</td>
              <td>Online</td>
              <td>
                <button class="btn btn-primary btn-xs">Join</button>
              </td>
            </tr>
            <tr>
              <td>Lesson 1</td>
              <td>12:00 - 13:00</td>
              <td>John Doe</td>
              <td>Online</td>
              <td>
                <button class="btn btn-primary btn-xs">Join</button>
              </td>
            </tr>
            <tr>
              <td>Lesson 1</td>
              <td>12:00 - 13:00</td>
              <td>John Doe</td>
              <td>Online</td>
              <td>
                <button class="btn btn-primary btn-xs">Join</button>
              </td>
            </tr>
            <tr>
              <td>Lesson 1</td>
              <td>12:00 - 13:00</td>
              <td>John Doe</td>
              <td>Online</td>
              <td>
                <button class="btn btn-primary btn-xs">Join</button>
              </td>
            </tr>
            <tr>
              <td>Lesson 1</td>
              <td>12:00 - 13:00</td>
              <td>John Doe</td>
              <td>Online</td>
              <td>
                <button class="btn btn-primary btn-xs">Join</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UpcomingLessonTable;
